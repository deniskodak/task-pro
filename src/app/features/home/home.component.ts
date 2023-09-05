import { AngularFireDatabase } from '@angular/fire/compat/database';
import { tasksLoadingProjectsSelector } from './../../core/store/tasks/tasks.selectors';
import { LoaderComponent } from './../../shared/loader/loader.component';
import { NgSubDirective } from './../../shared/directives/sub.directive';
import { NEED_HELP_KEY, NeedHelpModalComponent } from 'src/app/features/home/need-help-modal/need-help-modal.component';
import { CREATE_BOARD_KEY, CreateBoardModalComponent } from 'src/app/features/home/create-board-modal/create-board-modal.component';
import { CREATE_PROJECT_KEY, CreateProjectModalComponent } from 'src/app/features/home/create-project-modal/create-project-modal.component';
import { CREATE_TASK_KEY, CreateTaskModalComponent } from './create-task-modal/create-task-modal.component';
import { ModalService, Options } from 'src/app/core/services/modal.service';
import { TasksComponent } from './tasks/tasks.component';
import { tasksBoardsSelector } from 'src/app/core/store/tasks/tasks.selectors';
import { tasksActions } from './../../core/store/tasks/tasks.actions';
import { Store } from '@ngrx/store';
import { SidebarService } from './../../core/services/sidebar.service';
import { SidebarComponent } from './../../core/layouts/sidebar/sidebar.component';
import { HeaderComponent } from './../../core/layouts/header/header.component';
import { AsyncPipe, NgClass, NgIf } from '@angular/common';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import {
  LayoutService,
  Breakpoints,
} from 'src/app/core/services/layout.service';
import { Board } from 'src/app/core/models/board.model';

const MODAL_KEYS = {
  task: CREATE_TASK_KEY,
  project: CREATE_PROJECT_KEY,
  board: CREATE_BOARD_KEY,
  help: NEED_HELP_KEY,
};

@Component({
  standalone: true,
  imports: [
    NgClass,
    AsyncPipe,
    HeaderComponent,
    SidebarComponent,
    NgIf,
    CreateBoardModalComponent,
    NeedHelpModalComponent,
    CreateProjectModalComponent,
    CreateTaskModalComponent,
    NgIf,
    AsyncPipe,
    TasksComponent,
    NgSubDirective,
    LoaderComponent
  ],
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  readonly breakpoints = Breakpoints;
  boards$: Observable<Board[]>;
  layoutType$: Observable<string>;
  sidebarShown$: Observable<boolean>;
  modalOptions$: Observable<Options>;
  loading$: Observable<boolean>;
  modalKeys = MODAL_KEYS;

  constructor(
    private readonly layoutService: LayoutService,
    private store: Store,
    private sidebarService: SidebarService,
    private modalService: ModalService,
  ) {}

  ngOnInit(): void {
    this.layoutType$ = this.layoutService.layoutType$;
    this.sidebarShown$ = this.sidebarService.isShown$;
    this.boards$ = this.store.select(tasksBoardsSelector);
    this.store.dispatch(tasksActions.fetchBoardsStart());
    this.modalOptions$ = this.modalService.modalOptions$;
    this.loading$ = this.store.select(tasksLoadingProjectsSelector);
    this.store.dispatch(tasksActions.fetchBoardImages());
    // const boardImages = [
    //   {
    //     name: "sakura",
    //     previewImage: {
    //       'baseUrl':       "https://firebasestorage.googleapis.com/v0/b/taskpro-e66a3.appspot.com/o/preview%2Fsakura.png?alt=media&token=412fa1e9-be98-49f1-88a3-39fca9bc4b4a",

    //       '2xUrl': ""
    //     },
    //     backgroundImage: {
    //       web: {
    //         "baseUrl": "https://firebasestorage.googleapis.com/v0/b/taskpro-e66a3.appspot.com/o/backgrounds%2Fweb%2Fsakura.jpg?alt=media&token=05ac5851-1e38-46e9-ad7f-f02aa719197c",
    //         "2xUrl": "https://firebasestorage.googleapis.com/v0/b/taskpro-e66a3.appspot.com/o/backgrounds%2Fweb%2Fsakura_2x.jpg?alt=media&token=ef9cbb1c-6a5f-4ee7-9414-a84fa8411897" 
    //       }
    //     }
    //   },
    //   {
    //     name: "mounts",
    //     previewImage: {
    //       'baseUrl':       "https://firebasestorage.googleapis.com/v0/b/taskpro-e66a3.appspot.com/o/preview%2Fmounts.png?alt=media&token=75b564a8-79d5-4c9d-8a88-ae1df13dc5a2",
    //       '2xUrl': ""
    //     },
    //     backgroundImage: {
    //       web: {
    //         "baseUrl": "https://firebasestorage.googleapis.com/v0/b/taskpro-e66a3.appspot.com/o/backgrounds%2Fweb%2Fmounts_bg.jpg?alt=media&token=cb57e3f4-5ea2-4ffa-b1e0-bc28c880d050",
    //         "2xUrl": "https://firebasestorage.googleapis.com/v0/b/taskpro-e66a3.appspot.com/o/backgrounds%2Fweb%2Fmounts_bg_2x.jpg?alt=media&token=d52aed15-0a36-4493-81db-e640e089ff7c" 
    //       }
    //     }
    //   },
    //   {
    //     name: "lake",
    //     previewImage: {
    //       'baseUrl': 'https://firebasestorage.googleapis.com/v0/b/taskpro-e66a3.appspot.com/o/preview%2Flake.png?alt=media&token=8db59d21-3f0e-4f3e-82eb-6640e46d8dec',
    //       '2xUrl': ""
    //     },
    //     backgroundImage: {
    //       web: {
    //         "baseUrl": "https://firebasestorage.googleapis.com/v0/b/taskpro-e66a3.appspot.com/o/backgrounds%2Fweb%2Flake_bg.jpg?alt=media&token=e938e902-bfb2-4d92-9b81-587191b1efdd",
    //         "2xUrl": "https://firebasestorage.googleapis.com/v0/b/taskpro-e66a3.appspot.com/o/backgrounds%2Fweb%2Flake_bg_2x.jpg?alt=media&token=c0c2a4df-61e8-431d-a4dd-c928fbfa0f58" 
    //       }
    //     }
    //   },
    //   {
    //     name: "moon",
    //     previewImage: {
    //       'baseUrl': 'https://firebasestorage.googleapis.com/v0/b/taskpro-e66a3.appspot.com/o/preview%2Fmoon.png?alt=media&token=b5b2f9a2-7c77-4160-932c-0c3ea094d965',
    //       '2xUrl': ""
    //     },
    //     backgroundImage: {
    //       web: {
    //         "baseUrl": "https://firebasestorage.googleapis.com/v0/b/taskpro-e66a3.appspot.com/o/backgrounds%2Fweb%2Fmoon.jpg?alt=media&token=5add0d74-b50f-4809-8d65-6d97090b0d20",
    //         "2xUrl": "https://firebasestorage.googleapis.com/v0/b/taskpro-e66a3.appspot.com/o/backgrounds%2Fweb%2Fmoon_2x.jpg?alt=media&token=dce7e6d7-9dbe-4fb4-b271-7140eff3b149" 
    //       }
    //     }
    //   },
    //   {
    //     name: "jungle",
    //     previewImage: {
    //       'baseUrl': 'https://firebasestorage.googleapis.com/v0/b/taskpro-e66a3.appspot.com/o/preview%2Fjungle.png?alt=media&token=732be1d4-8a83-4a5e-8fae-2d9421693905',
    //       '2xUrl': ""
    //     },
    //     backgroundImage: {
    //       web: {
    //         "baseUrl": "https://firebasestorage.googleapis.com/v0/b/taskpro-e66a3.appspot.com/o/backgrounds%2Fweb%2Fjungle.jpg?alt=media&token=27a0ea2b-ff8c-42f2-8682-903ebcc344f7",
    //         "2xUrl": "https://firebasestorage.googleapis.com/v0/b/taskpro-e66a3.appspot.com/o/backgrounds%2Fweb%2Fjungle_2x.jpg?alt=media&token=2db290d0-a74c-4f10-b8f2-5fbdfaf42104" 
    //       }
    //     }
    //   },
    //   {
    //     name: "cloud",
    //     previewImage: {
    //       'baseUrl': 'https://firebasestorage.googleapis.com/v0/b/taskpro-e66a3.appspot.com/o/preview%2Fcloud.png?alt=media&token=bd9f2b69-c318-41d9-907b-cb4fa715b7c0',
    //       '2xUrl': ""
    //     },
    //     backgroundImage: {
    //       web: {
    //         "baseUrl": "https://firebasestorage.googleapis.com/v0/b/taskpro-e66a3.appspot.com/o/backgrounds%2Fweb%2Fclound_bg.jpg?alt=media&token=a33dcc5d-7c01-44b0-b289-a0d5396b4fc3",
    //         "2xUrl": "https://firebasestorage.googleapis.com/v0/b/taskpro-e66a3.appspot.com/o/backgrounds%2Fweb%2Fcloud_bg_2x.jpg?alt=media&token=f322afd0-ca2e-4f25-a61e-acf362bafece" 
    //       }
    //     }
    //   },
    //   {
    //     name: "rocks",
    //     previewImage: {
    //       'baseUrl': 'https://firebasestorage.googleapis.com/v0/b/taskpro-e66a3.appspot.com/o/preview%2Frocks.png?alt=media&token=26b04f7f-eeb8-4484-8625-5ece7c3a8588',
    //       '2xUrl': ""
    //     },
    //     backgroundImage: {
    //       web: {
    //         "baseUrl": "https://firebasestorage.googleapis.com/v0/b/taskpro-e66a3.appspot.com/o/backgrounds%2Fweb%2Frocks.jpg?alt=media&token=fb5fe18e-bb47-45cb-a0ba-01b9864858b2",
    //         "2xUrl": "https://firebasestorage.googleapis.com/v0/b/taskpro-e66a3.appspot.com/o/backgrounds%2Fweb%2Frocks_2x.jpg?alt=media&token=964c561a-2782-4f69-bc20-bf85b3f37d2f" 
    //       }
    //     }
    //   },
    //   {
    //     name: "bubble",
    //     previewImage: {
    //       'baseUrl': 'https://firebasestorage.googleapis.com/v0/b/taskpro-e66a3.appspot.com/o/preview%2Fbubble.png?alt=media&token=ea62ede9-f00b-4cb5-8004-03fa0a54d125',
    //       '2xUrl': ""
    //     },
    //     backgroundImage: {
    //       web: {
    //         "baseUrl": "https://firebasestorage.googleapis.com/v0/b/taskpro-e66a3.appspot.com/o/backgrounds%2Fweb%2Fbubble.jpg?alt=media&token=0065a487-b273-4bcd-96d2-394f7f24c871",
    //         "2xUrl": "https://firebasestorage.googleapis.com/v0/b/taskpro-e66a3.appspot.com/o/backgrounds%2Fweb%2Fbubble_2x.jpg?alt=media&token=745ed70c-a2a0-4fd0-8792-107c8d25552d" 
    //       }
    //     }
    //   },
    //   {
    //     name: "planet",
    //     previewImage: {
    //       'baseUrl': 'https://firebasestorage.googleapis.com/v0/b/taskpro-e66a3.appspot.com/o/preview%2Fplanet.png?alt=media&token=6793473b-2181-435f-97cd-5ba2da6bc9cc',
    //       '2xUrl': ""
    //     },
    //     backgroundImage: {
    //       web: {
    //         "baseUrl": "https://firebasestorage.googleapis.com/v0/b/taskpro-e66a3.appspot.com/o/backgrounds%2Fweb%2Fplanet.jpg?alt=media&token=0c70f112-92de-4352-9e8a-ff662724ed1d",
    //         "2xUrl": "https://firebasestorage.googleapis.com/v0/b/taskpro-e66a3.appspot.com/o/backgrounds%2Fweb%2Fplanet_2x.jpg?alt=media&token=b28b04b6-f3ab-401f-8e4f-036a17836e2e" 
    //       }
    //     }
    //   },
    //   {
    //     name: "ship",
    //     previewImage: {
    //       'baseUrl': 'https://firebasestorage.googleapis.com/v0/b/taskpro-e66a3.appspot.com/o/preview%2Fship.png?alt=media&token=960f0aaf-0ae4-48f0-9376-e5ac851f3f9f',
    //       '2xUrl': ""
    //     },
    //     backgroundImage: {
    //       web: {
    //         "baseUrl": "https://firebasestorage.googleapis.com/v0/b/taskpro-e66a3.appspot.com/o/backgrounds%2Fweb%2Fship.jpg?alt=media&token=0820eefa-c6a4-4dea-b315-634c3bb33167",
    //         "2xUrl": "https://firebasestorage.googleapis.com/v0/b/taskpro-e66a3.appspot.com/o/backgrounds%2Fweb%2Fship_2x.jpg?alt=media&token=860f3439-d1d7-4569-90ac-9f0d5e6a9f3d" 
    //       }
    //     }
    //   },
    //   {
    //     name: "balloon",
    //     previewImage: {
    //       'baseUrl': 'https://firebasestorage.googleapis.com/v0/b/taskpro-e66a3.appspot.com/o/preview%2Fballoon.png?alt=media&token=f200125c-2064-423d-ad96-d57f36a3f1ff',
    //       '2xUrl': ""
    //     },
    //     backgroundImage: {
    //       web: {
    //         "baseUrl": "https://firebasestorage.googleapis.com/v0/b/taskpro-e66a3.appspot.com/o/backgrounds%2Fweb%2Fballoon.jpg?alt=media&token=f225b4c0-b856-46fb-a505-8b5c4319ee36",
    //         "2xUrl": "https://firebasestorage.googleapis.com/v0/b/taskpro-e66a3.appspot.com/o/backgrounds%2Fweb%2Fballoon_2x.jpg?alt=media&token=c8bc3e45-5a48-4cac-ba9f-21f599be8f1b" 
    //       }
    //     }
    //   },
    //   {
    //     name: "sand",
    //     previewImage: {
    //       'baseUrl': 'https://firebasestorage.googleapis.com/v0/b/taskpro-e66a3.appspot.com/o/preview%2Fsand.png?alt=media&token=224ababb-ec46-422c-88da-d85ef89ea69b',
    //       '2xUrl': ""
    //     },
    //     backgroundImage: {
    //       web: {
    //         "baseUrl": "https://firebasestorage.googleapis.com/v0/b/taskpro-e66a3.appspot.com/o/backgrounds%2Fweb%2Fsand.jpg?alt=media&token=e7756fbd-9c2d-48f9-9c82-8715533878ea",
    //         "2xUrl": "https://firebasestorage.googleapis.com/v0/b/taskpro-e66a3.appspot.com/o/backgrounds%2Fweb%2Fsand_2x.jpg?alt=media&token=9dc7fcea-70bf-4496-a5f5-8a7acd7d37f0" 
    //       }
    //     }
    //   },
    //   {
    //     name: "boat",
    //     previewImage: {
    //       'baseUrl': 'https://firebasestorage.googleapis.com/v0/b/taskpro-e66a3.appspot.com/o/preview%2Fboat.png?alt=media&token=1d09dc0a-d7b0-451f-9e40-4f403c16a609',
    //       '2xUrl': ""
    //     },
    //     backgroundImage: {
    //       web: {
    //         "baseUrl": "https://firebasestorage.googleapis.com/v0/b/taskpro-e66a3.appspot.com/o/backgrounds%2Fweb%2Fboat.jpg?alt=media&token=f367ff10-f8cf-4979-b1ab-31b6ab4cd10f",
    //         "2xUrl": "https://firebasestorage.googleapis.com/v0/b/taskpro-e66a3.appspot.com/o/backgrounds%2Fweb%2Fboat_2x.jpg?alt=media&token=3f510011-9b26-41e8-ad4b-9067273ae57a" 
    //       }
    //     }
    //   },
    //   {
    //     name: "balloons",
    //     previewImage: {
    //       'baseUrl': 'https://firebasestorage.googleapis.com/v0/b/taskpro-e66a3.appspot.com/o/preview%2Fballoons.png?alt=media&token=6a16cbc5-088a-4747-ac90-3b0958bffb00',
    //       '2xUrl': ""
    //     },
    //     backgroundImage: {
    //       web: {
    //         "baseUrl": "https://firebasestorage.googleapis.com/v0/b/taskpro-e66a3.appspot.com/o/backgrounds%2Fweb%2Fballoons.jpg?alt=media&token=3d306e97-98eb-4098-b06c-5e19e3c68686",
    //         "2xUrl": "https://firebasestorage.googleapis.com/v0/b/taskpro-e66a3.appspot.com/o/backgrounds%2Fweb%2Fballoons_2x.jpg?alt=media&token=28161e09-5974-42d2-882d-d216afd70819" 
    //       }
    //     }
    //   },
    //   {
    //     name: "sky",
    //     previewImage: {
    //       'baseUrl': 'https://firebasestorage.googleapis.com/v0/b/taskpro-e66a3.appspot.com/o/preview%2Fsky.png?alt=media&token=31239f7d-da0d-45c2-9b7e-94afae5145ce',
    //       '2xUrl': ""
    //     },
    //     backgroundImage: {
    //       web: {
    //         "baseUrl": "https://firebasestorage.googleapis.com/v0/b/taskpro-e66a3.appspot.com/o/backgrounds%2Fweb%2Fsky.jpg?alt=media&token=65db3bcc-c3ac-4077-a9c9-c0fc78912f5f",
    //         "2xUrl": "https://firebasestorage.googleapis.com/v0/b/taskpro-e66a3.appspot.com/o/backgrounds%2Fweb%2Fsky_2x.jpg?alt=media&token=2322b06c-71a2-4d4b-ae67-6f3e58a30cfd" 
    //       }
    //     }
    //   },
    // ]
    // this.db.list('/').set('boardImages', boardImages)
  }

  onBackdropClick() {
    this.sidebarService.hide();
  }
}
