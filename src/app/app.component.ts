import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, NavigationEnd,RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet,RouterLink,RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true,
})
export class AppComponent {
  showNav = false;
  userName: string | null = null;

  constructor(private router: Router) {
    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const currentRoute = router.routerState.snapshot.root;
        const hideNav = currentRoute.firstChild?.data['hideNav'];
        this.showNav = !hideNav;
      }
    });
  }
  ngOnInit() {
    this.userName = sessionStorage.getItem('name');
    this.showNav = this.router.url !== '/signup';
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/signup']);
  }


}
