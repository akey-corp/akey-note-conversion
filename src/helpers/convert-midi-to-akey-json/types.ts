export interface RecommendedSettings {
  song_title: string;
  category: string;
  recommended_instrument: string;
}

export interface ConvertMidiToAkeyJson {
  midiFileName: string;
  outputJsonName: string;
  recommendedSettings: RecommendedSettings;
}
