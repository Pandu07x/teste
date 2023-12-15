import { ChangeDetectorRef, Component, ElementRef, Renderer2 } from '@angular/core';
import { SidebarService } from 'src/app/_services/sidebar.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent {
 // isSidebarOpen = false;

  constructor(private renderer: Renderer2, private el: ElementRef, private sidebarService: SidebarService) {}

  get isSidebarOpen() {
    return this.sidebarService.isSidebarOpen$;
  }

  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }

  // toggleSidebar(): void {
  //   this.isSidebarOpen = !this.isSidebarOpen;
  //   this.menuBtnChange();
  // }

  menuBtnChange(): void {
    const closeBtn = this.el.nativeElement.querySelector('#btn');

    if (this.isSidebarOpen) {
      this.renderer.removeClass(closeBtn, 'bx-menu');
      this.renderer.addClass(closeBtn, 'bx-menu-alt-right');
    } else {
      this.renderer.removeClass(closeBtn, 'bx-menu-alt-right');
      this.renderer.addClass(closeBtn, 'bx-menu');
    }
  }
}
