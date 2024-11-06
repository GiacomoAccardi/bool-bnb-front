<template>
    <div class="container-sm">
        <div class="row">
            <div class="col-12 text-center mt-3">
                <div class="search-bar">
                    <div class="input-group">
                        <span class="input-group-text"><i class="fas fa-search"></i></span>
                        <input type="text" class="form-control" placeholder="Dove vuoi andare?" aria-label="Search">
                        <input type="number" class="form-control" placeholder="Prezzo Min" aria-label="Prezzo Min">
                        <input type="number" class="form-control" placeholder="Prezzo Max" aria-label="Prezzo Max">
                        <input type="number" class="form-control" placeholder="Numero Stanze" aria-label="Numero Stanze">
                        <button class="btn btn-primary">Cerca</button>
                    </div>
                </div>
            </div>
            <div class="col-12 mt-5 text-center">
                <h1>Benvenuti da Bool BNB</h1>
                <h2>Scopri quanto è facile prenotare un soggiorno da sogno nel nostro accogliente B&B.</h2>
            </div>
        </div>
        <div class="row">
            <div class="col-4">
                <div class="content text-center">
                    <img class="search-img mt-5" src="../assets/search.png">
                    <p class="mt-3">Trova il soggiorno perfetto per te, in modo rapido e semplice. Scegli tra le nostre camere accoglienti e prenota facilmente online. </p>
                </div>
            </div>
            <div class="col-4">
                <div class="content text-center">
                    <img class="search-img mt-5" src="../assets/travel-agency.png">
                    <p class="mt-3">Confronta le nostre opzioni e scegli la migliore per te. Offriamo camere diverse per soddisfare ogni esigenza, sia che tu voglia una fuga romantica o una vacanza in famiglia.</p>
                </div>
            </div>
            <div class="col-4">
                <div class="content text-center">
                    <img class="search-img mt-5" src="../assets/money.png">
                    <p class="mt-3">Approfitta delle nostre offerte speciali e pacchetti sconto. Prenota direttamente e risparmia sulla tua prossima avventura!</p>
                </div>
            </div>
        </div>
    </div>
    <div class="container-fluid bg">
        <div class="row">
            <div class="col-12 text-center mt-5">
                <h1>Le migliori destinazioni per il tuo soggiorno al Bool BNB</h1>
            </div>
    
            <!-- Roma -->
            <div class="col-4">
                <div class="content-place mt-5">
                    <img src="../assets/roma.webp" alt="roma" class="img-fluid">
                    <h2 class="text-center">Roma</h2>
                    <p class="p-2">Scopri la capitale d'Italia con il nostro accogliente B&B situato nel cuore di Roma. A pochi passi dai monumenti storici, offriamo camere eleganti e una colazione tipica romana per un soggiorno indimenticabile.</p>
                    <div class="p-2">
                        <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                        <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                        <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                        <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                        <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                    </div>
                    <a href="#prenotazioni" class="btn btn-primary mt-3">Scopri di più</a>
                </div>
            </div>
    
            <!-- Firenze -->
            <div class="col-4">
                <div class="content-place mt-5">
                    <img src="../assets/firenze.jpeg" alt="firenze" class="img-fluid">
                    <h2 class="text-center">Firenze</h2>
                    <p class="p-2">Vivi l'arte e la cultura rinascimentale di Firenze. Il nostro B&B ti accoglierà in un ambiente raffinato, a pochi passi dalle gallerie e musei più importanti, con una colazione preparata con ingredienti freschi e locali.</p>
                    <div class="p-2">
                        <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                        <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                        <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                        <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                        <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                    </div> 
                    <a href="#prenotazioni" class="btn btn-primary mt-3">Scopri di più</a>
                </div>
            </div>
    
            <!-- Venezia -->
            <div class="col-4">
                <div class="content-place mt-5">
                    <img src="../assets/venezia.webp" alt="venezia" class="img-fluid">
                    <h2 class="text-center">Venezia</h2>
                    <p class="p-2">Scopri il fascino della città dei canali. Il nostro B&B ti offrirà un'esperienza unica, con camere accoglienti e una vista mozzafiato sulla città più romantica del mondo, ideale per esplorare la laguna e i suoi dintorni.</p>
                    <div class="p-2">
                        <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                        <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                        <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                        <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                        <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                    </div>
                    <a href="#prenotazioni" class="btn btn-primary mt-3">Scopri di più</a>
                </div>
            </div>
    
            <!-- Milano -->
            <div class="col-4">
                <div class="content-place mt-5">
                    <img src="../assets/milano.jpg" alt="milano" class="img-fluid">
                    <h2 class="text-center">Milano</h2>
                    <p class="p-2">Esplora Milano, la capitale della moda e del design. Il nostro B&B ti offre camere moderne e confortevoli, situato a pochi minuti dalle principali attrazioni culturali e dalle vie dello shopping.</p>
                    <div class="p-2">
                        <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                        <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                        <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                        <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                        <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                    </div>
                    <a href="#prenotazioni" class="btn btn-primary mt-3">Scopri di più</a>
                </div>
            </div>
    
            <!-- Napoli -->
            <div class="col-4">
                <div class="content-place mt-5">
                    <img src="../assets/napoli.jpg" alt="napoli" class="img-fluid">
                    <h2 class="text-center">Napoli</h2>
                    <p class="p-2">Vivi il calore e il gusto di Napoli, la città della pizza e delle tradizioni. Il nostro B&B ti accoglierà con il calore tipico napoletano, camere confortevoli e colazione con i sapori autentici della Campania.</p>
                    <div class="p-2">
                        <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                        <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                        <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                        <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                        <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                    </div>
                    <a href="#prenotazioni" class="btn btn-primary mt-3">Scopri di più</a>
                </div>
            </div>
    
            <!-- Costiera Amalfitana -->
            <div class="col-4">
                <div class="content-place mt-5">
                    <img src="../assets/amalfi.jpg" alt="costiera amalfitana" class="img-fluid">
                    <h2 class="text-center">Costiera Amalfitana</h2>
                    <p class="p-2">Scopri la magia della Costiera Amalfitana, con i suoi panorami mozzafiato e i pittoreschi villaggi a picco sul mare. Il nostro B&B ti offre una vista spettacolare, camere raffinate e una colazione all'insegna dei sapori mediterranei.</p>
                    <div class="p-2">
                        <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                        <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                        <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                        <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                        <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                    </div>
                    <a href="#prenotazioni" class="btn btn-primary mt-3">Scopri di più</a>
                </div>
            </div>
        </div>
    </div>
    <div class="container">
        <div class="row">
            <div class="col-12">
                <h1 class="text-center mt-5">Resta aggiornato per scoprire le nostre offerte</h1>
            </div>
        </div>
        <div class="row mt-5 mb-5 g-0">
            <!-- Colonna con l'immagine e testo sopra -->
            <div class="col-9 position-relative">
                <!-- Immagine di sfondo -->
                <img class="offerte dark-image img-fluid" src="../assets/offerte.jpg" alt="Firenze">
    
                <!-- Testo sopra l'immagine -->
                <div class="offer-text position-absolute top-0 start-0 m-3">
                    <h4 class="text-white font-weight-bold">Scopri le migliori offerte</h4>
                </div>
                <div class="position-absolute bottom-0 end-0 mb-5 me-2">
                    <p class="text-white font-weight-bold">utilizza il codice promozionale!</p>
                </div>
                <!-- Bottone sopra l'immagine -->
                <div class="position-absolute bottom-0 end-0 m-3">
                    <a href="#" class="btn btn-primary rounded-4">winter 2024</a>
                </div>
            </div>
            <div class="col-3 bg-yellow d-flex justify-content-center align-items-center">
                <div class="text-center">
                    <p class="text-white">Sconto del</p>
                    <h2 class="text-white">50%</h2>
                </div>
            </div>
        </div>
  </div>
  </template>
  
  <script>
  export default {
    name: "AppHome",
  };
  </script>
  
  <style lang="scss" scoped>
  
  .container-sm{
    margin-top: 380px;
  }
  .search-img {
    width: 150px;
}

.content-place{
    background-color: gray;
    border-radius: 20px;
   
    
}
.content-place img{
    width: 100%;
    border-radius: 20px;
 
}

.bg{
    background: rgb(219, 219, 219);
    overflow: hidden;
   
}

.content-place {
    cursor: pointer;
    position: relative;
    padding: 10px 24px;
    background-color: transparent;
    font-weight: 600;
    transition: all 0.7s cubic-bezier(0.23, 1, 0.320, 1);
    overflow: hidden;
    margin-bottom: 30px;
  }
  
  .content-place::before {
    content: '';
    position: absolute;
    inset: 0;
    margin: auto;
    width: 50px;
    height: 50px;
    border-radius: inherit;
    scale: 0;
    z-index: -1;
   
    transition: all 0.6s cubic-bezier(0.23, 1, 0.320, 1);
  }
  
  .content-place:hover::before {
    scale: 3;
  }
  
  .content-place:hover {
    color: #212121;
    scale: 1.1;
    box-shadow: 0 0px 20px rgba(193, 163, 98,0.4);
  }
  
  .content-place:active {
    scale: 1;
  }

  .img-fluid{
    height: 300px;;
  }

  .offerte{
    width: 100%;
    object-fit: cover;
    height: 200px;
  }

  .bg-yellow{
    background-color: rgb(255, 179, 0);
  }

  .dark-image{
    filter: brightness(50%);
  }
  
  </style>
  
  