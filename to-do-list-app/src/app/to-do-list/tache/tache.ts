import { Component, input, output } from '@angular/core';
import { Task } from '../task';

@Component({
  selector: 'app-tache',
  imports: [],
  templateUrl: './tache.html',
  styleUrl: './tache.css',
})
export class Tache {
  readonly tache = input.required<Task>();
  readonly terminee = output();

  toggle(): void {
    this.terminee.emit();
  }
}
