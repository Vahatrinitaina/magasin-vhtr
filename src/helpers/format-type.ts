const formatType = (type: string): string => {
    let color: string;
   
    switch (type) {
      case 'Feu': 
      color = 'badge rounded-pill bg-primary'; 
        break; 
      case 'Eau': 
        color = 'badge rounded-pill bg-secondary'; 
        break; 
      case 'Plante': 
        color = 'badge rounded-pill bg-success'; 
        break; 
      case 'Insecte': 
        color = 'badge rounded-pill bg-danger'; 
        break; 
      case 'Normal': 
        color = 'badge rounded-pill bg-warning text-dark'; 
        break; 
      case 'Vol': 
        color = 'badge rounded-pill bg-dark'; 
        break; 
      case 'Poison': 
        color = 'badge rounded-pill bg-deep-purple'; 
        break; 
      case 'Fée': 
        color = 'badge rounded-pill bg-pink'; 
        break; 
      case 'Psy': 
        color = 'badge rounded-pill bg-deep-purple'; 
        break; 
      case 'Electrik': 
        color = 'badge rounded-pill bg-lime'; 
        break; 
      case 'Combat': 
        color = 'badge rounded-pill bg-deep-orange'; 
        break; 
      default: 
        color = 'badge badge rounded-pill bg-light text-dark'; 
        break; 
    }
   
    return color;
}
export default formatType