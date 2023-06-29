const FormatTypeCouleurs = (typ: string): string => {
    let color: string;
   
    switch (typ) {
      case 'Rouge': 
      color = 'badge rounded-pill bg-danger'; 
        break; 
      case 'Gris clair': 
        color = 'badge rounded-pill bg-secondary'; 
        break; 
      case 'Vert': 
        color = 'badge rounded-pill bg-success'; 
        break; 
      case 'Bleue': 
        color = 'badge rounded-pill bg-primary'; 
        break; 
      case 'Jaune': 
        color = 'badge rounded-pill bg-warning'; 
        break; 
      case 'Blanc': 
        color = 'badge rounded-pill bg-light'; 
        break; 
      case 'Noir': 
        color = 'badge rounded-pill bg-dark'; 
        break; 
      default: 
        color = 'badge badge rounded-pill bg-light'; 
        break; 
    }
   
    return color;
}
export default FormatTypeCouleurs