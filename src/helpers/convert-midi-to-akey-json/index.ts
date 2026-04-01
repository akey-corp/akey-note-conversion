import { Midi } from "@tonejs/midi";
import KEY_MAP from "./key-map";
import { RecommendedSettings, AkeyJson, MidiPkg } from "./types";

/**
 * Converts MIDI data into AKEY JSON format in the browser.
 * @param midiData ArrayBuffer or Uint8Array of the MIDI file.
 * @param recommendedSettings Settings for the song.
 * @returns The converted JSON object.
 */
export async function convertMidiToAkeyJson(
  midiData: ArrayBuffer | Uint8Array,
  recommendedSettings: RecommendedSettings,
): Promise<AkeyJson> {
  const MidiConstructor: MidiPkg = Midi;
  const midi = new MidiConstructor(midiData);

  // 1. Collect every single note from every track
  let allNotes: { time: number; midi: number; key: string }[] = [];

  midi.tracks.forEach((track) => {
    track.notes.forEach((note) => {
      if (KEY_MAP[note.midi]) {
        allNotes.push({
          time: note.time,
          midi: note.midi,
          key: KEY_MAP[note.midi],
        });
      }
    });
  });

  // 2. Sort all notes chronologically
  allNotes.sort((a, b) => a.time - b.time);

  // 3. Focus on Melody (Preferring Right Hand / Higher Octaves)
  // We filter to notes >= 60 (Middle C) to avoid accompaniment jitter skewing the tempo.
  let melodyOnlyNotes = allNotes.filter((n) => n.midi >= 60);
  if (melodyOnlyNotes.length < 5) {
    melodyOnlyNotes = allNotes; // Fallback for very low-pitched songs
  }

  // 4. Group notes that happen at the exact same time
  const TIME_THRESHOLD = 0.1;
  let timeBuckets: {
    time: number;
    rawNotes: { midi: number; key: string }[];
  }[] = [];

  melodyOnlyNotes.forEach((note) => {
    let bucket = timeBuckets.find(
      (b) => Math.abs(b.time - note.time) < TIME_THRESHOLD,
    );
    if (!bucket) {
      bucket = { time: note.time, rawNotes: [] };
      timeBuckets.push(bucket);
    }
    // Prevent duplicate exact notes
    if (!bucket.rawNotes.find((n) => n.midi === note.midi)) {
      bucket.rawNotes.push(note);
    }
  });

  // Sort buckets chronologically
  timeBuckets.sort((a, b) => a.time - b.time);

  // 5. Adaptive Phrase Break Logic
  let gaps: number[] = [];
  for (let i = 1; i < timeBuckets.length; i++) {
    gaps.push(timeBuckets[i].time - timeBuckets[i - 1].time);
  }

  // Find median gap to adapt to tempo
  // Filter out very small gaps (jitter/overlap) to get a better sense of the actual beat
  const filteredGaps = gaps.filter((g) => g > 0.15);
  const sortedGaps = [...filteredGaps].sort((a, b) => a - b);
  const medianGap =
    sortedGaps.length > 0 ? sortedGaps[Math.floor(sortedGaps.length / 2)] : 0.5;

  // A phrase break is defined as a gap significantly larger than the median beat.
  // We also check the next gap to avoid adding spaces for syncopated notes (e.g. dotted-quarter followed by eighth).
  const breakThreshold = medianGap * 1.1;
  const syncopationThreshold = medianGap * 0.5;

  let resultString = "";
  let lastTime = timeBuckets.length > 0 ? timeBuckets[0].time : 0;

  // 6. Convert to Single Typing Sequence
  timeBuckets.forEach((bucket, index) => {
    const currentGap = bucket.time - lastTime;
    const nextGap =
      index < timeBuckets.length - 1
        ? timeBuckets[index + 1].time - bucket.time
        : 100;

    if (
      index > 0 &&
      currentGap >= breakThreshold - 0.01 &&
      nextGap > syncopationThreshold
    ) {
      resultString += " ";
    }

    // Pick the highest pitch note in the bucket as the melody
    bucket.rawNotes.sort((a, b) => a.midi - b.midi);
    const melodyNote = bucket.rawNotes[bucket.rawNotes.length - 1];

    if (melodyNote) {
      resultString += melodyNote.key;
    }

    lastTime = bucket.time;
  });

  // 7. Build the new AKEY OS JSON Structure
  return {
    ...recommendedSettings,
    key_map_guide: resultString,
  };
}
