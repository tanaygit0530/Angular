import { Component, OnInit, signal } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-items',
  standalone: true,
  template: `
    <div style="padding: 20px;">
      <h2>Fetched Items</h2>
      <ul style="list-style-type: none; padding: 0;">
        @for (item of items(); track item.id) {
          <li style="margin-bottom: 20px; padding: 15px; border: 1px solid #ccc; border-radius: 8px;">
            <h3 style="margin-top: 0; color: #333;">{{ item.title }}</h3>
            <p style="color: #666; margin-bottom: 0;">{{ item.body }}</p>
          </li>
        } @empty {
          <li>Loading...</li>
        }
      </ul>
    </div>
  `,
})
export class ItemsComponent implements OnInit {
  items = signal<any[]>([]);

  constructor(private dataService: DataService) {}

  async ngOnInit() {
    try {
      const data = await this.dataService.fetchItems();
      this.items.set(data);
    } catch (error) {
      console.error('Failed to fetch items:', error);
    }
  }
}
