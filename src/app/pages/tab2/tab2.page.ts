import { Component, ViewChild, OnInit } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { NoticiasService } from '../../services/noticias.service';
import { Article } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  @ViewChild(IonSegment, { static: true }) segment: IonSegment;

  categorias = [
    'business',
    'entertainment',
    'general',
    'health',
    'science',
    'sports',
    'technology',
  ];

  noticias: Article[] = [];

  constructor(private noticiasService: NoticiasService) {}

  cambioCategoria(event: any) {

    this.noticias = []

    this.cargarNoticias(event.detail.value)
  }

  ngOnInit() {
    this.segment.value = this.categorias[0];
    this.cargarNoticias(this.categorias[0]);
  }

  cargarNoticias(categoria: string, event?: any){
    this.noticiasService
      .getTopHeadLinesCategoria(categoria)
      .subscribe((resp) => {
        // console.log(resp);
        this.noticias.push(...resp.articles);

        if (event) {
          event.target.complete();
        }

      });
  }

  loadData(event: any) {
    this.cargarNoticias(this.segment.value, event);
  }

}
