import { Component, OnInit } from '@angular/core';
import { SoccerTrackerService } from '../service/soccer-tracker.service';
import { NgForm } from '@angular/forms';


interface ProfileDAO {
  _id: string,
  playername: string,
  clubname: string,
  youthclub: string,
  position: string,
  goals: number,
  assists: number,
  yellowcards: number,
  redcards: number,
  tackles: number,
  saves: number,
  dateOfBirth: string
}

@Component({
  selector: 'app-soccer-tracker',
  templateUrl: './soccer-tracker.component.html',
  styleUrls: ['./soccer-tracker.component.css']
})
export class SoccerTrackerComponent implements OnInit {

  playerProfiles: ProfileDAO[] = [];
  playerTemp: any;
  createProfileBool: boolean = false;
  editProfileBool: boolean = false;
  deleteProfileBool: boolean = false;
  //profileIcon= faUser;
  constructor(private soccerService: SoccerTrackerService) { }

  ngOnInit(): void {
    this.getAllProfiles();
  }

  getAllProfiles() {
    this.soccerService.getAllProfiles().subscribe((profiles) => {
      this.playerProfiles = profiles.posts;
      console.log(profiles);
    }, error => {
      console.log(error);
    });
  }

  onEdit(player: ProfileDAO) {
    this.soccerService.updatePlayerProfile(player, player._id).subscribe((profiles) => {
      console.log(profiles.message);
      this.getAllProfiles();
      this.onEditClick();
    }, error => {
      console.log(error);
    });
  }

  onEditClick() {
    this.editProfileBool = !this.editProfileBool;
  }

  onDeleteClick() {
    this.deleteProfileBool = !this.deleteProfileBool;
  }
  onDelete(player: ProfileDAO) {
    this.soccerService.deleteProfileById(player._id).subscribe((profiles) => {
      console.log(profiles.message);
      this.getAllProfiles();
      this.onDeleteClick();
    }, error => {
      console.log(error);
    });

  }

  onCreateClick() {
    this.createProfileBool = !this.createProfileBool;
  }
  onCreate(form: NgForm) {
    const player: ProfileDAO = JSON.parse(JSON.stringify({
      playername: form.value.playername,
      clubname: form.value.clubname,
      youthclub: form.value.youthclub,
      position: form.value.position,
      goals: Number(form.value.goals),
      assists: Number(form.value.assists),
      yellowcards: Number(form.value.yellowcards),
      redcards: Number(form.value.redcards),
      tackles: Number(form.value.tackles),
      saves: Number(form.value.saves),
      dateOfBirth: form.value.dateOfBirth
    }));
    this.soccerService.createPlayerProfile(player).subscribe((profiles) => {
      console.log(profiles.message);
      this.getAllProfiles();
      this.onCreateClick();
    }, error => {
      console.log(error);
    });
  }

  onSearch(f: NgForm) {
    this.soccerService.getProfileByPlayerName(f.value.playername).subscribe((profiles) => {
      this.playerProfiles = profiles.posts;
      console.log(profiles);
    }, error => {
      console.log(error);
    });
  }

  onSortByGoals() {
    this.soccerService.sortProfilesByGoals().subscribe((profiles) => {
      this.playerProfiles = profiles.posts;
      console.log(profiles);
    }, error => {
      console.log(error);
    });
  }

  onSortByAssists() {
    this.soccerService.sortProfilesByAssists().subscribe((profiles) => {
      this.playerProfiles = profiles.posts;
      console.log(profiles);
    }, error => {
      console.log(error);
    });
  }

  onSortByYellowCards() {
    this.soccerService.sortProfilesByYellowCrads().subscribe((profiles) => {
      this.playerProfiles = profiles.posts;
      console.log(profiles);
    }, error => {
      console.log(error);
    });
  }

  onSortByRedCards() {
    this.soccerService.sortProfilesByRedCards().subscribe((profiles) => {
      this.playerProfiles = profiles.posts;
      console.log(profiles);
    }, error => {
      console.log(error);
    });
  }

  onSortByTackles() {
    this.soccerService.sortProfilesByTackles().subscribe((profiles) => {
      this.playerProfiles = profiles.posts;
      console.log(profiles);
    }, error => {
      console.log(error);
    });
  }

  onSortBySaves() {
    this.soccerService.sortProfilesBySaves().subscribe((profiles) => {
      this.playerProfiles = profiles.posts;
      console.log(profiles);
    }, error => {
      console.log(error);
    });
  }

}
