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
                <h2>Scopri quanto è facile affittare il tuo appartamento preferito.</h2>
            </div>
        </div>
        <div class="row">
            <div class="col-4">
                <div class="content text-center">
                    <img class="search-img mt-5" src="../assets/search.png">
                    <p class="mt-3">puoi cercare l'appartamento giusto per te <br> in modo facile e veloce </p>
                </div>
            </div>
            <div class="col-4">
                <div class="content text-center">
                    <img class="search-img mt-5" src="../assets/travel-agency.png">
                    <p class="mt-3">Confronta centinaia di prezzi e scopri l'offerta<br> più adatta a te</p>
                </div>
            </div>
            <div class="col-4">
                <div class="content text-center">
                    <img class="search-img mt-5" src="../assets/money.png">
                    <p class="mt-3">Risparmia alla grande e scopri le nostre offerte per prenotare l'appartamento dei tuoi sogni</p>
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
    transition: all 0.3s cubic-bezier(0.23, 1, 0.320, 1);
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
  
  </style>
  
  