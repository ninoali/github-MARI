// UK Cities and Areas Data
export const cityAreas: Record<string, string[]> = {
  // Major Cities
  Bath: [
    'City Centre - BA1',
    'Lansdown - BA1',
    'Widcombe - BA2',
    'Combe Down - BA2',
    'Weston - BA1',
    'Larkhall - BA1',
    'Southdown - BA2',
    'Oldfield Park - BA2',
    'Twerton - BA2',
    'Bear Flat - BA2'
  ],

  Birmingham: [
    // City Centre & Surrounds
    'City Centre - B1',
    'Jewellery Quarter - B3',
    'Digbeth - B5',
    'Brindleyplace - B1',
    // North Birmingham
    'Erdington - B23',
    'Sutton Coldfield - B72',
    'Perry Barr - B42',
    // South Birmingham
    'Moseley - B13',
    'Kings Heath - B14',
    'Selly Oak - B29',
    // East Birmingham
    'Bordesley Green - B9',
    'Small Heath - B10',
    'Yardley - B25',
    // West Birmingham
    'Edgbaston - B15',
    'Harborne - B17',
    'Quinton - B32'
  ],

  Brighton: [
    // Central
    'City Centre - BN1',
    'North Laine - BN1',
    'The Lanes - BN1',
    // Coastal
    'Hove - BN3',
    'Kemptown - BN2',
    'Brighton Marina - BN2',
    // Suburban
    'Preston Park - BN1',
    'Patcham - BN1',
    'Rottingdean - BN2',
    'Woodingdean - BN2'
  ],

  Bristol: [
    // Central
    'City Centre - BS1',
    'Clifton - BS8',
    'Redland - BS6',
    // North
    'Horfield - BS7',
    'Bishopston - BS7',
    'Westbury-on-Trym - BS9',
    // South
    'Bedminster - BS3',
    'Southville - BS3',
    'Knowle - BS4',
    // East
    'St George - BS5',
    'Fishponds - BS16',
    'Easton - BS5',
    // West
    'Henleaze - BS9',
    'Stoke Bishop - BS9',
    'Sea Mills - BS9'
  ],

  Cambridge: [
    'City Centre - CB2',
    'Chesterton - CB4',
    'Cherry Hinton - CB1',
    'Trumpington - CB2',
    'Newnham - CB3',
    'Romsey - CB1',
    'Mill Road - CB1',
    'Arbury - CB4'
  ],

  Leeds: [
    // City Centre
    'City Centre - LS1',
    'Riverside - LS1',
    'Cultural Quarter - LS2',
    // North Leeds
    'Headingley - LS6',
    'Chapel Allerton - LS7',
    'Roundhay - LS8',
    // South Leeds
    'Beeston - LS11',
    'Morley - LS27',
    'Middleton - LS10',
    // East Leeds
    'Harehills - LS9',
    'Seacroft - LS14',
    'Cross Gates - LS15',
    // West Leeds
    'Armley - LS12',
    'Pudsey - LS28',
    'Bramley - LS13'
  ],

  Liverpool: [
    // City Centre
    'City Centre - L1',
    'Business District - L2',
    'Waterfront - L3',
    // North Liverpool
    'Anfield - L4',
    'Everton - L5',
    'Kirkdale - L4',
    // South Liverpool
    'Aigburth - L17',
    'Allerton - L18',
    'Garston - L19',
    // East Liverpool
    'Edge Hill - L7',
    'Kensington - L7',
    'Wavertree - L15',
    // West Liverpool
    'West Derby - L12',
    'Croxteth - L11',
    'Norris Green - L11'
  ],

  London: [
    // === CENTRAL LONDON ===
    'Baker Street - W1',
    'Belgravia - SW1',
    'Bloomsbury - WC1',
    'City of London - EC',
    'Covent Garden - WC2',
    'Fitzrovia - W1',
    'Holborn - WC1',
    'Mayfair - W1',
    'Soho - W1',
    'South Bank - SE1',
    'The West End - W1',
    'Westminster - SW1',

    // === NORTH LONDON ===
    'Angel - N1',
    'Archway - N19',
    'Camden Town - NW1',
    'Crouch End - N8',
    'Finsbury Park - N4',
    'Highbury - N5',
    'Highgate - N6',
    'Holloway - N7',
    'Islington - N1',
    'Kentish Town - NW5',
    'Kings Cross - N1C',
    'Muswell Hill - N10',
    'Stoke Newington - N16',
    'Wood Green - N22',

    // === SOUTH LONDON ===
    'Balham - SW12',
    'Battersea - SW11',
    'Brixton - SW2',
    'Clapham - SW4',
    'Crystal Palace - SE19',
    'Dulwich - SE21',
    'Forest Hill - SE23',
    'Greenwich - SE10',
    'Kennington - SE11',
    'Peckham - SE15',
    'Putney - SW15',
    'Streatham - SW16',
    'Tooting - SW17',
    'Vauxhall - SW8',
    'Wandsworth - SW18',
    'Wimbledon - SW19',

    // === EAST LONDON ===
    'Bethnal Green - E2',
    'Bow - E3',
    'Brick Lane - E1',
    'Canary Wharf - E14',
    'Dalston - E8',
    'Hackney - E8',
    'Hoxton - N1',
    'Isle of Dogs - E14',
    'Leyton - E10',
    'Mile End - E1',
    'Shoreditch - EC2',
    'Spitalfields - E1',
    'Stratford - E15',
    'Walthamstow - E17',
    'Whitechapel - E1',

    // === WEST LONDON ===
    'Acton - W3',
    'Chiswick - W4',
    'Ealing - W5',
    'Fulham - SW6',
    'Hammersmith - W6',
    'Holland Park - W11',
    'Kensington - W8',
    'Notting Hill - W11',
    'Paddington - W2',
    'Shepherds Bush - W12',
    'West Kensington - W14',

    // === OUTER LONDON - NORTH ===
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

    // === OUTER LONDON - SOUTH ===
    'Beckenham - BR3',
    'Bromley - BR1',
    'Croydon - CR0',
    'Kingston upon Thames - KT1',
    'Mitcham - CR4',
    'New Malden - KT3',
    'Orpington - BR6',
    'Richmond - TW9',
    'Sutton - SM1',
    'Twickenham - TW1',

    // === OUTER LONDON - EAST ===
    'Barking - IG11',
    'Bexleyheath - DA6',
    'Chingford - E4',
    'Dagenham - RM10',
    'Hornchurch - RM11',
    'Ilford - IG1',
    'Rainham - RM13',
    'Romford - RM1',
    'Upminster - RM14',
    'Woodford - IG8',

    // === OUTER LONDON - WEST ===
    'Greenford - UB6',
    'Hayes - UB3',
    'Hillingdon - UB10',
    'Hounslow - TW3',
    'Northolt - UB5',
    'Ruislip - HA4',
    'Southall - UB1',
    'Uxbridge - UB8',
    'West Drayton - UB7'
  ],

  Manchester: [
    // City Centre
    'City Centre - M1',
    'Deansgate - M3',
    'Northern Quarter - M4',
    'Piccadilly - M1',
    // North Manchester
    'Cheetham Hill - M8',
    'Blackley - M9',
    'Harpurhey - M9',
    // South Manchester
    'Chorlton - M21',
    'Didsbury - M20',
    'Withington - M20',
    // East Manchester
    'Ancoats - M4',
    'Openshaw - M11',
    'Gorton - M18',
    // West Manchester
    'Salford - M5',
    'Old Trafford - M16',
    'Stretford - M32'
  ],

  Newcastle: [
    // City Centre
    'City Centre - NE1',
    'Quayside - NE1',
    'Grainger Town - NE1',
    // North Newcastle
    'Gosforth - NE3',
    'Jesmond - NE2',
    'Heaton - NE6',
    // South Newcastle
    'Gateshead - NE8',
    'Low Fell - NE9',
    'Felling - NE10',
    // East Newcastle
    'Byker - NE6',
    'Walker - NE6',
    'Wallsend - NE28',
    // West Newcastle
    'Fenham - NE4',
    'Elswick - NE4',
    'Benwell - NE4'
  ],

  Nottingham: [
    // City Centre
    'City Centre - NG1',
    'Lace Market - NG1',
    'Hockley - NG1',
    // North Nottingham
    'Sherwood - NG5',
    'Bulwell - NG6',
    'Arnold - NG5',
    // South Nottingham
    'West Bridgford - NG2',
    'Clifton - NG11',
    'Wilford - NG11',
    // East Nottingham
    'Carlton - NG4',
    'Sneinton - NG2',
    'Gedling - NG4',
    // West Nottingham
    'Wollaton - NG8',
    'Beeston - NG9',
    'Stapleford - NG9'
  ],

  Oxford: [
    'City Centre - OX1',
    'Jericho - OX2',
    'Summertown - OX2',
    'Headington - OX3',
    'Cowley - OX4',
    'Iffley - OX4',
    'Marston - OX3',
    'Wolvercote - OX2'
  ],

  Sheffield: [
    // City Centre
    'City Centre - S1',
    'Cathedral Quarter - S1',
    'Kelham Island - S3',
    // North Sheffield
    'Hillsborough - S6',
    'Chapeltown - S35',
    'Ecclesfield - S35',
    // South Sheffield
    'Ecclesall - S11',
    'Millhouses - S7',
    'Dore - S17',
    // East Sheffield
    'Attercliffe - S9',
    'Handsworth - S13',
    'Darnall - S9',
    // West Sheffield
    'Crookes - S10',
    'Walkley - S6',
    'Ranmoor - S10'
  ],

  York: [
    'City Centre - YO1',
    'Bootham - YO30',
    'Clifton - YO30',
    'Bishopthorpe - YO23',
    'Fulford - YO10',
    'Heworth - YO31',
    'Acomb - YO24',
    'South Bank - YO23'
  ]
};