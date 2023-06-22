import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SoccerTrackerService {

  constructor(private http: HttpClient) { }

  getAllProfiles() {
    return this.http.get<any>('http://localhost:3000/api/soccer-tracker/profiles');
  }

  createPlayerProfile(player: any) {
    return this.http.post<any>('http://localhost:3000/api/soccer-tracker/save', player);
  }

  updatePlayerProfile(player: any, id: string) {
    return this.http.put<any>(`http://localhost:3000/api/soccer-tracker/update/${id}`, player);
  }

  getProfileById(id: string) {
    return this.http.get<any>(`http://localhost:3000/api/soccer-tracker/profiles/${id}`);
  }

  deleteProfileById(id: string) {
    return this.http.delete<any>(`http://localhost:3000/api/soccer-tracker/delete/${id}`);
  }

  getProfileByPlayerName(playername: string) {
    var str = playername.replace(/ /g, '%20');
    return this.http.get<any>(`http://http://localhost:3000/api/soccer-tracker/profile-byname/${str}`);
  }

  sortProfilesByGoals() {
    return this.http.get<any>('http://localhost:3000/api/soccer-tracker/goals');
  }

  sortProfilesByAssists() {
    return this.http.get<any>('http://localhost:3000/api/soccer-tracker/assists');
  }

  sortProfilesByYellowCrads() {
    return this.http.get<any>('http://localhost:3000/api/soccer-tracker/yellowcards');
  }

  sortProfilesByRedCards() {
    return this.http.get<any>('http://localhost:3000/api/soccer-tracker/redcards');
  }

  sortProfilesByTackles() {
    return this.http.get<any>('http://localhost:3000/api/soccer-tracker/tackles');
  }

  sortProfilesBySaves() {
    return this.http.get<any>('http://localhost:3000/api/soccer-tracker/saves');
  }

}

