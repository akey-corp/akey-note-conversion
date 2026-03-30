import { Midi } from "@tonejs/midi";
import KEY_MAP from "./key-map";
import { RecommendedSettings } from "./types";

/**
 * Converts MIDI data into AKEY JSON format in the browser.
 * @param midiData ArrayBuffer or Uint8Array of the MIDI file.
 * @param recommendedSettings Settings for the song.
 * @returns The converted JSON object.
 */
export async function convertMidiToAkeyJson(
  midiData: ArrayBuffer | Uint8Array,
  recommendedSettings: RecommendedSettings,
) {
  const midi = new Midi(midiData);

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

  // 3. Group notes that happen at the exact same time
  const TIME_THRESHOLD = 0.05;
  let timeBuckets: {
    time: number;
    rawNotes: { midi: number; key: string }[];
  }[] = [];

  allNotes.forEach((note) => {
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

  let rightHandElements: string[] = [];
  let leftHandElements: string[] = [];

  // 4 & 5. Smart QWERTY Splitting & Formatting
  timeBuckets.forEach((bucket) => {
    // Sort notes from lowest pitch to highest pitch
    bucket.rawNotes.sort((a, b) => a.midi - b.midi);

    let leftNotes: string[] = [];
    let rightNotes: string[] = [];

    // Initial Split: Below Middle C (60) is Left, 60 and above is Right
    bucket.rawNotes.forEach((note) => {
      if (note.midi >= 60) rightNotes.push(note.key);
      else leftNotes.push(note.key);
    });

    // --- THE QWERTY HAND-SHARING FIX ---
    if (rightNotes.length >= 2 && leftNotes.length === 0) {
      const firstRight = rightNotes.shift();
      if (firstRight) leftNotes.push(firstRight);
    } else if (leftNotes.length >= 2 && rightNotes.length === 0) {
      const lastLeft = leftNotes.pop();
      if (lastLeft) rightNotes.push(lastLeft);
    }

    // --- THE QWERTY CHORD LIMITER ---
    if (rightNotes.length > 2) rightNotes = [rightNotes[rightNotes.length - 1]];
    if (leftNotes.length > 2) leftNotes = [leftNotes[0]];

    // Format Right Hand (Pushing to Array)
    if (rightNotes.length === 0) rightHandElements.push("-");
    else if (rightNotes.length === 1) rightHandElements.push(rightNotes[0]);
    else rightHandElements.push(`[${rightNotes.join("+")}]`); // Uses + for chords

    // Format Left Hand (Pushing to Array)
    if (leftNotes.length === 0) leftHandElements.push("-");
    else if (leftNotes.length === 1) leftHandElements.push(leftNotes[0]);
    else leftHandElements.push(`[${leftNotes.join("+")}]`); // Uses + for chords
  });

  // 6. Build the new AKEY OS JSON Structure
  return {
    ...recommendedSettings,
    key_map_guide_right: rightHandElements.join(", "),
    key_map_guide_left: leftHandElements.join(", "),
  };
}
