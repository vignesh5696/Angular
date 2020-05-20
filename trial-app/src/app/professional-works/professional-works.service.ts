import { Injectable } from '@angular/core';
import { ProfessionalWorksModel } from './professional-works.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { exhaustMap, take, tap } from 'rxjs/operators';
import { TimelineModel } from '../shared/timeline/timeline.model';

@Injectable({providedIn : 'root'})
export class ProfessionalWorksService{

    timelineData : TimelineModel[];

    constructor(private http : HttpClient, private authService : AuthService){}

    onSaveProfessionalworks(data : ProfessionalWorksModel[]){
        const workWithTimeline =[data,this.timelineData];
        return this.authService.user.pipe(take(1),exhaustMap(user => {
            return this.http.put<[]>(
                "https://vignesh-nagarajan.firebaseio.com/professionalworks.json",workWithTimeline,
                {
                    params  : new HttpParams().set('auth',user.token)
                })
        }))
    }

    onFetchProfessionalworks(){
        return this.http.get<[]>( "https://vignesh-nagarajan.firebaseio.com/professionalworks.json").pipe(
            tap(res => {
                this.timelineData=res.slice(1)[0];
            })
        )
    }

    getTimelineData(timelineData : TimelineModel[]){
        this.timelineData = timelineData;
    }

    fetchTimelineData(){
        return this.timelineData;
    }

}