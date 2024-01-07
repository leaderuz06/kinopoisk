// let tv = new Swiper(`.trend__tv-slider`, {
//     slidesPerView: 1,
//     spaceBetween: 27,
//     // slidesPerGroup: 3,
//     loop: true,
//     // loopFillGroupWithBlank: true,
//     navigation: {
//         nextEl: `.trend__tv-slider .swiper-button-next`,
//         prevEl: `.trend__tv-slider .swiper-button-prev`,
//     },
//     breakpoints: {
//         1440: {
//             slidesPerView: 6,
//         },
//         1200: {
//             slidesPerView: 5,
//         },
//         960: {
//             slidesPerView: 4,
//         },
//         720: {
//             slidesPerView: 3,
//         },
//         500: {
//             slidesPerView: 2,
//         },
//     }
// });

// let awaited = new Swiper(`.popular__actors-slider`, {
//     slidesPerView: 1,
//     spaceBetween: 27,
//     // slidesPerGroup: 3,
//     loop: true,
//     // loopFillGroupWithBlank: true,
//     navigation: {
//         nextEl: `.popular__actors-slider .swiper-button-next`,
//         prevEl: `.popular__actors-slider .swiper-button-prev`,
//     },
//     breakpoints: {
//         1440: {
//             slidesPerView: 6,
//         },
//         1200: {
//             slidesPerView: 5,
//         },
//         960: {
//             slidesPerView: 4,
//         },
//         720: {
//             slidesPerView: 3,
//         },
//         500: {
//             slidesPerView: 2,
//         },
//     }
// });

// API

const searchLink = document.querySelector('.search__link  .icon-reg'),
     mainContent = document.querySelector('.main__content'),
     mainClose = document.querySelector('.main__close'),
     mainBlock = document.querySelector('.main__block'),
     pagination = document.querySelector('.pagination'),
     mainSolo = document.querySelector('.main__solo'),
     moviesLink = document.querySelectorAll('.movies__link'),
     formMain = document.querySelector('.form__main'),
     headerInput  = document.querySelector('.header__input'),
     anime = document.querySelector('.anime'),
     headerItems  = document.querySelector('.header__items'),
     headerBtn = document.querySelector('.header__btn'),
     headerAbs = document.querySelector('.header__abs');



    //   menu bar
    headerBtn.addEventListener('click',function (event) {
        event.preventDefault();
        headerItems.classList.toggle('active')
        headerAbs.classList.toggle('active')
    })

    headerAbs.addEventListener('click',function (e) {
        // console.log(e.currentTarget)
        if(e.target == e.currentTarget){
            headerItems.classList.remove('active')
            headerAbs.classList.remove('active')
        }
    })
    //   menu bar

    // host


    const host = "https://kinopoiskapiunofficial.tech";
    const hostName = "X-API-KEY";
    const hostValue = "f93dc692-5336-4064-81f0-3dda437ccf95";


    class Kino {
     
        constructor () {
            this.date = new Date().getMonth();
            this.curYear = new Date().getFullYear();
            this.months = ['january','february','march','april','may','june','july','august','september','october','november','decamber'];
            this.curMonth = this.months[this.date ]
        }

        fOpen = async (url) => {
            let response = await fetch(url, {
                headers: {
                    [hostName]: hostValue
                }
            })
            
            if(response.ok) return response.json()
            else throw new Error(`Bu manzildagi ma'lumotga ulanolmadik ${url}`)
        }

        getTopMovies = (page) => this.fOpen(`${host}/api/v2.2/films/collections?type=TOP_250_MOVIES&page=${page}`);
        
        getSoloFilms = (id) => this.fOpen(`${host}/api/v2.2/films/${id}`);

        getMoviesAwaited = (page = 1, year = this.curYear, month = this.curMonth) => this.fOpen(`${host}/api/v2.1/films/releases?year=${year}&month=${month}&page=${page}`)
       
        getReviews = (id) => this.fOpen(`${host}/api/v2.2/films/${id}/reviews?page=1&order=DATE_DESC`)

        getSearch = (page = 1, keyword) => this.fOpen(`${host}/api/v2.1/films/search-by-keyword?keyword=${keyword}&page=${page}`)
        getFrames = (id) => this.fOpen(`${host}/api/v2.2/films/${id}/images?type=STILL&page=1`)
        getPrimiers = (year = this.curYear,month = this.curMonth) => this.fOpen(`${host}/api/v2.2/films/premieres?year=${year}&month=${month}`)
    }

    const db = new Kino();

    // console.log(db.getSoloFilms(45694))
    // db.fOpen().then(res => {
    //     console.log(res)
    // })
    // db.getTopMovies().then(res => {
    //     console.log(res.items[0])
    // })

    // db.getSoloFilms(435).then(res => {
    //     console.log(res)
    // })

    //  db.getMoviesAwaited().then(res => {
    //         console.log(res)
    // })

    // db.getReviews(435).then(res => {
    //     console.log(res)
    // })

    // db.getSearch(1,"Два журналиста").then(res => {
    //     console.log(res)
    // })

    // db.getFrames(435).then(res => {
    //     console.log(res)
    // })

    function renderTrendMovies (elem = [],fn = [], films = [],pages = []) {
        anime.classList.add('active')
        elem.forEach((item,i) => {
            // console.log(item)
            let parent = document.querySelector(`${item} .swiper-wrapper`);
            // console.log(parent)
            db[fn[i]](pages[i]).then(data => {
                // console.log(data[films[i]])

                data[films[i]].forEach(el => {
                    // console.log(el.posterUrlPreview)
                    let slide = document.createElement("div")
                    slide.classList.add('swiper-slide');
                    slide.innerHTML = `
                    <div class="movie__item">
                        <img src="${el.posterUrlPreview}" alt="${el.nameRu ?? el.nameEn}" loading="lazy">
                   </div>
                    
                    `
                    parent.append(slide)
                });
                anime.classList.remove('active')

            })

            .then(() => {
                elem.forEach(item => {
                    new Swiper(`${item}`, {
                        slidesPerView: 1,
                        spaceBetween: 27,
                        // slidesPerGroup: 3,
                        loop: true,
                        // loopFillGroupWithBlank: true,
                        navigation: {
                            nextEl: `${item} .swiper-button-next`,
                            prevEl: `${item} .swiper-button-prev`,
                        },
                        breakpoints: {
                            1440: {
                                slidesPerView: 6,
                            },
                            1200: {
                                slidesPerView: 5,
                            },
                            960: {
                                slidesPerView: 4,
                            },
                            720: {
                                slidesPerView: 3,
                            },
                            500: {
                                slidesPerView: 2,
                            },
                        }
                    })   
                });
                
            })

            .catch(e => {
                anime.classList.remove('active')
            })

            
        });

    }

    renderTrendMovies([".trend__tv-slider",".popular__actors-slider"],["getTopMovies","getMoviesAwaited"],['items','releases'],[1,1])

   


    // render header


    function randMovies (num) {
        return Math.trunc(Math.random() * num + 1);  // 0 - 250
    }


    function renderHeader(page) {
        db.getTopMovies(page).then(data => {
            // console.log(data.items)
               // anime.classList.add('active')
            let max = randMovies(data.items.length)
            // console.log(max)
            // console.log(data.items[max])
            let filmId = data.items[max].kinopoiskId
            let filmRating = data.items[max].ratingKinopoisk

            // console.log(filmRating)

            db.getSoloFilms(filmId).then(response => {
                // console.log(response)

                let url = response.webUrl
                // console.log(url)

                let headerText = document.querySelector(".header__text")

                headerText.innerHTML = `

                    <h1 class="header__title">${response.nameRu || response.nameEn}</h1>
                    <div class="header__balls">
                        <span class="header__year">${response.year}</span>
                        <span class="logo__span header__rating  header__year ">${response.ratingAgeLimits} +</span>
                        <div class="header__seasons header__year">0+</div>
                        <div class="header__stars header__year"><span class="icon-solid"></span><strong>${filmRating}</strong></div>
                    </div>
                    <p class="header__descr">
                        ${response.description}
                    </p>
                    <div class="header__buttons">
                        <a href="${url}" class="header__watch"><span class="icon-solid"></span>watch</a>
                        <a href="#" class="header__more header__watch movie__item">More information</a>
                    </div>
                `
            })

         

        })
    }

    let page = 13;

    let rand = randMovies(page)
   
    renderHeader(rand)


     // render header



    // current date
    
    // current date
