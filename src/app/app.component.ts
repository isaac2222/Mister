import { Component, OnInit } from "@angular/core"

@Component({
  selector: 'mt-app',
  templateUrl: 'app.component.html',
  styleUrls: [
    '../assets/css/bootstrap.min.css',
    '../assets/css/default-css.css',
    '../assets/css/font-awesome.min.css',
    '../assets/css/metisMenu.css',
    '../assets/css/responsive.css',
    '../assets/css/slicknav.min.css',
    '../assets/css/styles.css',
    '../assets/css/themify-icons.css',
    '../assets/css/typography.css'
  ]
})

export class AppComponent implements OnInit {

  content = 'Bem vindo ao Altima FIM'

  constructor() { }

  ngOnInit() {
  }

}
