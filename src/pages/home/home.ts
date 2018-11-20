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

  public duration: { seconds: number, minutes: number } = {
    seconds: 0,
    minutes: 0
  };
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
    this.duration.seconds = duration;
    this.duration.minutes = duration / 60;
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
    }
  }

  public reload(): void {
    window.location.reload();
  }

}
