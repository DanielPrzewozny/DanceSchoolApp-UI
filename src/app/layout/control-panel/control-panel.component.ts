import { AfterViewInit, Component, HostListener } from '@angular/core';
import { EventEl } from 'src/app/models/ui-models/EventEl.model';
import { CdkDragDrop, CdkDragEnd, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ModalService } from 'src/app/services/modals/modal.service';
import { delay } from 'rxjs';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.css']
})
export class ControlPanelComponent implements AfterViewInit {
  hours = [
    '8:00 AM',
    '9:00 AM',
    '10:00 AM',
    '11:00 AM',
    '12:00 PM',
    '1:00 PM',
    '2:00 PM',
    '3:00 PM',
    '4:00 PM',
    '5:00 PM',
  ];
  bodyText = 'This text can be updated in modal 1';
  places = ['Monday', 'Tueasday', 'Wednesday', 'Thursday', 'Friday'];
  eventElement: EventEl = {
    startTime: '',
    endTime: '',
    location:'',
    position: undefined
  };
  events: EventEl[] = [];

  cellWidth = 0;
  cellWidthHour = 0;
  cellHeight = 0;

  isSingleClick: Boolean = true;

  constructor(protected modalService: ModalService) {}

  ngAfterViewInit() {
    this.createEvent('10:00 AM', '4:00 PM', 'Tueasday');
    this.createEvent('11:00 AM', '2:00 PM', 'Thursday');
  }

  @HostListener('window:resize', ['$event'])
  sizeChange(event: any) {
    this.events.forEach(event => { event.position = this.calculateEventPosition(event.startTime, event.endTime, event.location);
      console.log(event.position);
    });
  }

  createEvent(startTime: string, endTime: string, location: string) {
    const event: EventEl = {
      startTime, endTime, location,
      position: undefined
    };
    event.position = this.calculateEventPosition(startTime, endTime, location);
    console.log(event.position);
    this.events.push(event);
  }

  calculateEventPosition(startTime: string, endTime: string, location: string) {
    const rect = document
      .getElementsByTagName('table')[0]
      .getBoundingClientRect();
    const columns = document.getElementsByClassName('cell-place');
    const rows = document.getElementsByClassName('cell-hour');
    const column = Array.from(columns).find((x) => x.innerHTML == location);
    const start = rows.item(this.hours.indexOf(startTime));
    const end = rows.item(this.hours.indexOf(endTime));

    const left = column != undefined ? column.getBoundingClientRect().left - rect.left : 0;
    const top = start != undefined ? start.getBoundingClientRect().top - rect.top: 0;
    const width = column != undefined ? column.getBoundingClientRect().width : 0;
    const height = end != undefined && start != undefined ?
      end.getBoundingClientRect().top - start.getBoundingClientRect().top : 0;

    return {
      height: height + 'px',
      top: top + 'px',
      left: left + 'px',
      width: width + 'px',
    };
  }

  dragEnded(event: EventEl, el: CdkDragEnd) {
    console.log('before');
    console.log('event.position.top: ' + event.position.top);
    console.log('event.position.left: ' + event.position.left);

    event.position.top = parseFloat(event.position.top.replace('px', ''))  + el.source.getFreeDragPosition().y + 'px';
    event.position.left = parseFloat(event.position.left.replace('px', ''))  + el.source.getFreeDragPosition().x + 'px';
    console.log('after drop');
    console.log('event.position.top: ' + event.position.top);
    console.log('event.position.left: ' + event.position.left);

    const rect = document.getElementsByTagName('table')[0].getBoundingClientRect();

    //const rows = Array.from(document.getElementsByClassName('cell-hour')).map(x=>x.getBoundingClientRect());
    const rows = document.getElementsByClassName('cell-hour');
    const row = Array.from(rows).find((x) => x.getBoundingClientRect().top - rect.top <= parseFloat(event.position.top.replace('px', '')) && x.getBoundingClientRect().top + x.getBoundingClientRect().height - rect.top >= parseFloat(event.position.top.replace('px', '')));
    event.position.top = row != undefined ? row.getBoundingClientRect().top - rect.top + 'px' : event.position.top ;
    event.startTime = row != undefined ? row.innerHTML : event.startTime ;
    //event.position.height = row != undefined ? row.height + 'px' : 0 + 'px';

    const columns = document.getElementsByClassName('cell-place');
    const column = Array.from(columns).find((x) => x.getBoundingClientRect().left - rect.left  <= parseFloat(event.position.left.replace('px', '')) && (x.getBoundingClientRect().left - rect.left + x.getBoundingClientRect().width) >= parseFloat(event.position.left.replace('px', '')));
    event.position.left = column != undefined ? column.getBoundingClientRect().left - rect.left + 'px' : 0 + 'px';
    event.position.width = column != undefined ? column.getBoundingClientRect().width + 'px' : 0 + 'px';
    event.location = column != undefined ? column.innerHTML : event.location;

    console.log('after binding');
    console.log('event.position.top: ' + event.position.top);
    console.log('event.position.left: ' + event.position.left);

    el.source._dragRef.reset();
  }
}
