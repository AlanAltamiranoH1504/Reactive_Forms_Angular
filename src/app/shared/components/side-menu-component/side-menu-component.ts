import { Component } from '@angular/core';
import { reactiveRoutes } from '../../../reactive/reactive.routes';
import { RouterLink, RouterLinkActive } from "@angular/router";
import authRoutes from '../../../auth/auth.routes';
import { countryRoutes } from '../../../country/country.routes';

interface MenuItem {
  title: string,
  path: string
}
const reactiveItems = reactiveRoutes[0].children ?? [];

@Component({
  selector: 'app-side-menu-component',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './side-menu-component.html',
  styleUrl: './side-menu-component.css',
})
export class SideMenuComponent {
  protected reactiveMenu: MenuItem[] = reactiveItems.map((r) => {
    return {
      path: `/reactive/${r.path}`,
      title: `${r.title}`
    }
  });

  protected authMenu: MenuItem[] = [{
    path: "./auth", title: "Registro"
  }];

  protected countryMenu: MenuItem[] = [{
    path: "./country", title: "Paises"
  }];
}
