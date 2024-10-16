export interface Weight {
  imperial: string;
  metric: string;
}

export interface Breed {
  weight: Weight;
  id: string;
  name: string;
  cfau_rl: string;
  vetstreet_url: string;
  vcahospitals_url: string;
  temperament: string;
  origin: string;
  country_codes: string;
  country_code: string;
  description: string;
  life_span: string;
  indoor: boolean;
  lap: boolean;
  alt_names: string;
  adaptability: number;
  affection_level: number;
  child_friendly: number;
  dog_friendly: number;
  energy_level: number;
  grooming: number;
  health_issues: number;
  intelligence: number;
  shedding_level: number;
  social_needs: number;
  stranger_friendly: number;
  vocalisation: number;
  experimental: boolean;
  hairless: boolean;
  natural: boolean;
  rare: boolean;
  rex: boolean;
  suppressed_tail: boolean;
  short_legs: boolean;
  wikipedia_url: string;
  hypoallergenic: boolean;
  reference_imageId: string;
}
