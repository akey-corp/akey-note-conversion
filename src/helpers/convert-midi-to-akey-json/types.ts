import { Midi } from "@tonejs/midi";

export interface RecommendedSettings {
  song_title: string;
  category: string;
  recommended_instrument: string;
}

export interface AkeyJson extends RecommendedSettings {
  key_map_guide: string;
}

export interface ConvertMidiToAkeyJson {
  midiFileName: string;
  outputJsonName: string;
  recommendedSettings: RecommendedSettings;
}

export type MidiPkg = typeof Midi;
