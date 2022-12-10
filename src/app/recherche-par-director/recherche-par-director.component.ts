import { Component, OnInit } from '@angular/core';
import { FilmService } from '../services/film.service';
import { Director } from '../model/Director.model';
import { Film } from '../model/film.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-recherche-par-director',
  templateUrl: './recherche-par-director.component.html',
  styleUrls: ['./recherche-par-director.component.css']
})
export class RechercheParDirectorComponent implements OnInit {
  IdDirector! : number;
  director! : Director[];
  films! : Film[];
  constructor(private filmService: FilmService,public authService: AuthService) { }

  ngOnInit(): void {
    this.filmService.listeDirectors().
      subscribe(cats => {this.director = cats._embedded.directors;
      console.log(cats);
    });

  }

  onChange() {
    this.filmService.rechercheParDirector(this.IdDirector).
subscribe(prods =>{this.films=prods});

    }
    chargerFilms() {
      this.filmService.listeFilms().subscribe(f => {
        console.log(f);
        this.films = f;
      });
    }
    supprimerFilm(p: Film) {
      let conf = confirm("Etes-vous sûr ?");
      if (conf == true)
        this.filmService.supprimerFilm(p.idFilm).subscribe(() => {
          console.log("film supprimé");
          this.chargerFilms();
        });
    }
    

}