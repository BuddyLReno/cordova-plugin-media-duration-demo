import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Media, MediaObject } from '../../app/typings/media';
import { Subscription } from 'rxjs/Subscription';
import { Platform } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public durationViaUpdate: string[] = [];
  public durationViaTimer: string[] = [];
  private durationLoopCounter: number = 0;
  private timerInterval: number = null;
  public playPauseText: string = "Play";
  private isPlaying: boolean = false;
  private audioStream: MediaObject = null;
  private durationUpdateSub: Subscription = null;
  private mediaUrl: String = "https://traffic.libsyn.com/secure/draudioarchives/11132018_the_dave_ramsey_show_archive_3.mp3?dest-id=412720";


  constructor(public navCtrl: NavController, public media: Media, public platform: Platform, public changeDetectorRef: ChangeDetectorRef) {
    this.platform.ready().then(() => {
      if (this.platform.is('cordova')) {
        this.loadAudio();
      }
    });
  }

  private loadAudio(): void {
    // first create the audio stream.
    this.audioStream = this.media.create(this.mediaUrl.trim());
    // then pass the status to the status update method.
    this.durationUpdateSub = this.audioStream.onDurationUpdate.subscribe((duration) => {
      this.onDurationUpdate(duration);
    });
  }

  private onDurationUpdate(duration: number): void {
    this.durationViaUpdate.push(duration.toString());
    this.changeDetectorRef.detectChanges();
  }

  public handlePlayPause(): void {
    if (this.isPlaying) {
      this.isPlaying = false;
      this.playPauseText = "Play";
      this.audioStream.pause();
    } else {
      this.isPlaying = true;
      this.playPauseText = "Pause";
      this.audioStream.play();
      this.getDuration();
    }
  }

  public reload(): void {
    window.location.reload();
  }

  private getDuration(): void {
    this.durationLoopCounter = 0;
    this.timerInterval = setInterval(() => {
      this.durationLoopCounter = this.durationLoopCounter + 100;
      if (this.durationLoopCounter > 2000) {
        clearInterval(this.timerInterval);
      }
      let dur = this.audioStream.getDuration();
      this.durationViaTimer.push(dur.toString());
      if (dur > 0) {
        clearInterval(this.timerInterval);
      }
      this.changeDetectorRef.detectChanges();
    }, 100);
  }

}
