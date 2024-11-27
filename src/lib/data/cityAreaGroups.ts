import { sortAreasByPostcode } from '../utils/sorting';

// City Area Groups Data Structure
export interface AreaGroup {
  label: string;
  areas: string[];
}

export type CityAreaGroups = Record<string, AreaGroup[]>;

export const cityAreaGroups: CityAreaGroups = {
  London: [
    {
      label: "Central London",
      areas: sortAreasByPostcode([
        'City of London - EC',
        'Holborn - WC1',
        'Bloomsbury - WC1',
        'Covent Garden - WC2',
        'Baker Street - W1',
        'Fitzrovia - W1',
        'Mayfair - W1',
        'Soho - W1',
        'The West End - W1',
        'Belgravia - SW1',
        'Westminster - SW1',
        'South Bank - SE1',
      ])
    },
    {
      label: "North London",
      areas: sortAreasByPostcode([
        'Angel - N1',
        'Kings Cross - N1C',
        'Finsbury Park - N4',
        'Highbury - N5',
        'Highgate - N6',
        'Holloway - N7',
        'Crouch End - N8',
        'Muswell Hill - N10',
        'Stoke Newington - N16',
        'Archway - N19',
        'Wood Green - N22',
        'Camden Town - NW1',
        'Kentish Town - NW5',
      ])
    },
    {
      label: "East London",
      areas: sortAreasByPostcode([
        'Brick Lane - E1',
        'Mile End - E1',
        'Spitalfields - E1',
        'Whitechapel - E1',
        'Bethnal Green - E2',
        'Bow - E3',
        'Chingford - E4',
        'Dalston - E8',
        'Hackney - E8',
        'Leyton - E10',
        'Canary Wharf - E14',
        'Isle of Dogs - E14',
        'Stratford - E15',
        'Walthamstow - E17',
        'Shoreditch - EC2',
      ])
    },
    {
      label: "South London",
      areas: sortAreasByPostcode([
        'Kennington - SE11',
        'Peckham - SE15',
        'Crystal Palace - SE19',
        'Dulwich - SE21',
        'Forest Hill - SE23',
        'Greenwich - SE10',
        'Battersea - SW11',
        'Balham - SW12',
        'Brixton - SW2',
        'Clapham - SW4',
        'Putney - SW15',
        'Streatham - SW16',
        'Tooting - SW17',
        'Wandsworth - SW18',
        'Wimbledon - SW19',
      ])
    },
    {
      label: "West London",
      areas: sortAreasByPostcode([
        'Paddington - W2',
        'Acton - W3',
        'Chiswick - W4',
        'Ealing - W5',
        'Hammersmith - W6',
        'Holland Park - W11',
        'Notting Hill - W11',
        'Shepherds Bush - W12',
        'West Kensington - W14',
      ])
    },
    {
      label: "Outer London - North",
      areas: sortAreasByPostcode([
        'Barnet - EN5',
        'Edgware - HA8',
        'Enfield - EN1',
        'Finchley - N3',
        'Harrow - HA1',
        'Hendon - NW4',
        'Mill Hill - NW7',
        'Southgate - N14',
        'Stanmore - HA7',
        'Wembley - HA9',
      ])
    },
    {
      label: "Outer London - East",
      areas: sortAreasByPostcode([
        'Ilford - IG1',
        'Woodford - IG8',
        'Barking - IG11',
        'Romford - RM1',
        'Hornchurch - RM11',
        'Rainham - RM13',
        'Upminster - RM14',
        'Dagenham - RM10',
        'Bexleyheath - DA6',
      ])
    },
    {
      label: "Outer London - West",
      areas: sortAreasByPostcode([
        'Southall - UB1',
        'Hayes - UB3',
        'Northolt - UB5',
        'Greenford - UB6',
        'West Drayton - UB7',
        'Uxbridge - UB8',
        'Hillingdon - UB10',
        'Hounslow - TW3',
      ])
    },
    {
      label: "Outer London - South",
      areas: sortAreasByPostcode([
        'Bromley - BR1',
        'Beckenham - BR3',
        'Orpington - BR6',
        'Croydon - CR0',
        'Mitcham - CR4',
        'Kingston upon Thames - KT1',
        'New Malden - KT3',
        'Sutton - SM1',
        'Richmond - TW9',
        'Twickenham - TW1',
      ])
    }
  ],
  // Other cities will be added with their sorted areas...
};