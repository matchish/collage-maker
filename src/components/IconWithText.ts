import { DataStore } from '../DataStore';

export class IconWithText {
  public dom: HTMLDivElement = document.createElement('div');
  public id: string;
  private dataStore: DataStore;
  constructor (
    url: string,
    title: string,
    description: string,
    containerClassName: string,
    id: string,
    dataStore: DataStore,
  ) {
    this.id = id;
    this.dataStore = dataStore;
    this.dom.setAttribute('data-id', id);
    this.dom.className = containerClassName;
    this.loadIcon(url);
    this.loadText(title, 'iconTitle');
    this.loadText(description, 'iconDescription');

    this.addDragNDropListeners();
  }

  private loadIcon = (url: string) => {
    const image = document.createElement('img');
    image.src = url;
    this.dom.appendChild(image);
  }

  private loadText = (content: string, className: string) => {
    const div = document.createElement('div');
    div.className = className;
    div.innerText = content;
    this.dom.appendChild(div);
  }

  private addDragNDropListeners = () => {
    let moving = false;
    let pointerX = 0;
    let pointerY = 0;
    this.dom.addEventListener('mousedown', (event: MouseEvent) => {
      // Left click
      if (event.which === 1) {
        moving = true;
        pointerX = event.offsetX;
        pointerY = event.offsetY;
      }
    });
    this.dom.addEventListener('mouseup', () => {
      moving = false;
      pointerX = 0;
      pointerY = 0;

      this.dataStore.moveIconWithText(this.id, this.dom.offsetLeft, this.dom.offsetTop);
    });
    document.addEventListener('mousemove', (event: MouseEvent) => {
      if (!moving) {
        return;
      }

      const left = event.clientX;
      const top = event.clientY;

      this.dom.style.left = `${left - pointerX}px`;
      this.dom.style.top = `${top - pointerY}px`;
    });
    document.addEventListener('click', () => {
      moving = false;
    });
  }

  public delete = () => {
    this.dataStore.deleteIcon(this.id);
    const dom = document.querySelector(`[data-id='${this.id}']`);
    dom?.remove();
  }
}
