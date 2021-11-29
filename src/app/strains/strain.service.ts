import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StrainSummary } from 'src/app/shared/models/strains/strain-summary.model';
import { Strain } from 'src/app/shared/models/strains/strain.model';
import { of } from 'rxjs';
import { map } from "rxjs/operators";
import { StrainListItem } from '../shared/models/strains/strain-list-item';

@Injectable({
  providedIn: 'root'
})
export class StrainService {

  baseUrl = `${environment.apiUrl}/strains`;

  constructor(
    private http: HttpClient
  ) { }

  getStrains(): Observable<StrainSummary[]> {
    
    const url = `${this.baseUrl}`;

    return this.http.get<StrainSummary[]>(url);
  }


  getStrain(id: string): Observable<StrainSummary> {

    const url = `${this.baseUrl}/${id}`;

    return this.http.get<StrainSummary>(url);
  }

  addEditStrain(strain: Strain): Observable<StrainSummary> {

    const url = `${this.baseUrl}`;

    return this.http.post<StrainSummary>(url, strain);
  }

  deleteStrain(id: number): Observable<number> {

    const url = `${this.baseUrl}/${id}`;

    return this.http.delete(url).pipe(map(res => id));
   
 
  }


}
