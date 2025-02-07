import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, NavigationEnd,RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true,
})
export class AppComponent {
  showNav = false;

  constructor(private router: Router) {
    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const currentRoute = router.routerState.snapshot.root;
        const hideNav = currentRoute.firstChild?.data['hideNav'];
        this.showNav = !hideNav;
      }
    });
  }
}
