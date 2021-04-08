AudioTrack = class {
  constructor(src) {
    this.src = src;
    this.title = "";
    this.artist = "";
    this.description = "";
    this.personnel = [];
  }
}

ranek = new AudioTrack("audio/ranek.wav");
ranek.title = "Ranek";
ranek.artist = "Adam Claussen";
ranek.description = "Ranek is the third track from saxophonist Adam Claussen’s debut album, Arethusa Falls. " +
  "This track was recorded in the University of Miami, Frost School of Music’s L. Austin Weeks Recording Studio. " +
  "Erin recorded, mixed, and mastered the full album, including Ranek. Ranek was part of Erin’s submission to " +
  "the 2019 Student Downbeat Awards for which she was awarded the Best Engineered Studio Recording.";
ranek.personnel = ["Composition: Adam Claussen", "Saxophone: Adam Claussen", "Piano: Andre Bernier", "Guitar: Robert Papacica",
  "Upright Bass: Marty Quinn", "Drums: Zander Ambrose"];

nobleSavage = new AudioTrack("audio/noble-savage.wav");
nobleSavage.title = "Noble Savage";
nobleSavage.artist = "Mitingu";
nobleSavage.description = "Recorded in February of 2019, Noble Savage was performed by a group of all-star international musicians. " +
  "Four musicians from four countries came together to record in the L. Austin Weeks Recording Studio at the University of Miami, " +
  "Frost School of Music. Although the rest of the tracks from this session have yet to be mixed and mastered, they are expected to be " +
  "released as an album in the near future. Erin recorded, mixed, and mastered Noble Savage.";
nobleSavage.personnel = ["Composition: Diego Melgar", "Guitar: Diego Melgar (United States)", "Piano: Juho Valjakka (Finland)",
  "Upright Bass: Jasper De Roeck (Belgium)", "Drums: Timo Wild (Switzerland)"];

downTheLine = new AudioTrack("audio/down-the-line.wav");
downTheLine.title = "Down the Line";
downTheLine.artist = "Kelly Schenk";
downTheLine.description = "Down the Line is Kelly Schenk's third single release. It was recorded in the L. Austin Weeks Recording Studio at the " +
  "University of Miami. You can listen to the rest of Kelly's discography on Spotify. Down the Line was recorded by Erin.";
downTheLine.personnel = ["Composition: Kelly Schenk", "Voice: Kelly Schenk", "Piano: Jake Shapiro", "Guitar: Tim Watson", "Guitar: Diego Melgar",
  "Bass: Marty Quinn", "Drums: Brahm Masala"];

kiitos = new AudioTrack("audio/kiitos.wav");
kiitos.title = "Kiitos";
kiitos.artist = "Transatlanttiset";
kiitos.description = "Transatlanttiset, or “Transatlantic” in Finnish, is the result of a collision between Nordic and American cultures. " +
  "Led by Finnish flautist & vocalist Josefiina Vannesluoma, American bassist Lowell Ringel, and Finnish trumpeter Tomi Nikku, this chamber jazz " +
  "ensemble combines high levels of artistry with close personal and musical synergy. Each of these rising stars brings their unique musical heritage " +
  "to both their compositional and improvisational contributions to the ensemble. Equally important to this intriguing instrumentation are drummer " +
  "Jesse Ojajärvi and cellist Mila Laine. The music moves in malleable landscapes of crossing melodies, free expression, and tight grooves, " +
  "as shown in their latest single release “So Far Yet So Close Together”, published on February 20, 2020. Erin mixed Kiitos, as well as their full album, Geodesics.";
kiitos.personnel = ["Composition: Lowell Ringel", "Voice: Josefiina Vannesluoma", "Flute: Josefiina Vannesluoma", "Trumpet: Tomi Nikku", "Bass: Lowell Ringel",
  "Cello: Mila Laine", "Drums: Jesse Ojajärvi"];

shenandoah = new AudioTrack("audio/shenandoah.wav");
shenandoah.title = "Shenandoah";
shenandoah.artist = "Seth Crail";
shenandoah.description = "Shenandoah is an arrangement of the classic folk tune, 'Oh Shenandoah'. Seth arranged this piece as part of his senior recital at the " +
  "Frost School of Music and recorded it in the studio shortly after. It was recorded, mixed, and mastered by Erin.";
shenandoah.personnel = ["Arrangement: Seth Crail", "Tenor Saxophone: Seth Crail", "Piano: Leo Folsom", "Upright Bass: Paul Pandit", "Drums: Garrett Fracol", "Violin: Claire Geho", "Violin: Nathan Hartson", "Viola: Marissa Katz", "Cello: Kyle Stachnik"];

theHenrysons = new AudioTrack("audio/the-henrysons.wav");
theHenrysons.title = "The Henrysons";
theHenrysons.artist = "Erin Mutchler";
theHenrysons.description = "This song was performed as part of Erin's senior recital at the Frost School of Music. The tune was composed by Wolfgang Muthspiel and Ralph Towner.";
theHenrysons.personnel = ["Composition: Woflgang Musthpiel", "Trumpet: Erin Mutchler", "Guitar: Joshua Bermudez", "Guitar: Jordan Rattner"];

const trackList = [ranek, nobleSavage, downTheLine, kiitos, shenandoah, theHenrysons];

Modal = class {
  constructor() {
    this.modal = document.getElementById("modal");
    this.trackSelectors = {
      title: document.getElementById("modal-track-title"),
      artist: document.getElementById("modal-track-artist"),
      description: document.getElementById("modal-track-description"),
      personnel: document.getElementById("modal-track-personnel"),
    };

    document.querySelectorAll(".read-more").forEach((button) => {
      button.onclick = function() {
        const trackIndex = parseInt(button.dataset.trackIndex);
        this.updateTrackInfo(trackIndex);
        this.modal.style.display = "block";
      }.bind(this);
    });

    document.querySelector(".modal-close").onclick = function() {
      this.modal.style.display = "none";
    }.bind(this);

    window.addEventListener("keydown", function(event) {
      this.modal.style.display = "none";
    }.bind(this));

    window.onclick = function(event) {
      if (event.target == this.modal) {
        this.modal.style.display = "none";
      }
    }.bind(this);

    this.updateTrackInfo(0);
  }

  updateTrackInfo(trackIndex) {
    this.trackSelectors.title.textContent = trackList[trackIndex].title;
    this.trackSelectors.artist.textContent = trackList[trackIndex].artist;
    this.trackSelectors.description.textContent = trackList[trackIndex].description;
    this.trackSelectors.personnel.innerHTML = "";
    for (let i = 0; i < trackList[trackIndex].personnel.length; ++i) {
      let person = document.createElement("li");
      person.textContent = trackList[trackIndex].personnel[i];
      this.trackSelectors.personnel.appendChild(person);
    }
  }
}

AudioPlayer = class {
  constructor() {
    this.track = document.createElement("audio");

    this.currentTrackIndex = -1;
    this.loadedFlag = false;
    this.isPlaying = false;
    this.updateTimer = "";

    this.transportSelectors = {
      slider: document.getElementById("transport-slider"),
      currentTime: document.getElementById("current-time"),
      totalDuration: document.getElementById("total-duration"),
      playPauseIcon: document.getElementById("transport-play-pause-icon"),
    }

    document.querySelectorAll(".play-button").forEach((button) => {
      button.onclick = function() {
        this.load(button.dataset.trackIndex);
        this.play();
      }.bind(this);
    });

    document.querySelectorAll(".transport-button").forEach((button) => {
      button.onclick = function() {
        const transportFunction = parseInt(button.dataset.transportFunction);
        if (!this.loadedFlag) {
          this.load(0);
          this.loadedFlag = true;
        }
        if (transportFunction === -1) {
          this.prev();
        } else if (transportFunction === 0) {
          this.toggle();
        } else if (transportFunction === 1) {
          this.next();
        } else {
          console.log("Transport Function is not valid");
        }
      }.bind(this);
    });

    this.transportSelectors.slider.onchange = this.seekTo.bind(this);
  }

  load(trackIndex) {
    if (this.currentTrackIndex === trackIndex) {
      return;
    }
    this.currentTrackIndex = trackIndex;
    this.track.src = trackList[this.currentTrackIndex].src;
    this.track.load();
    clearInterval(this.updateTimer);
    this.resetTransport();

    this.updateTimer = setInterval(this.seekUpdate.bind(this), 1000);
  }

  play() {
    this.track.play();
    this.isPlaying = true;
    this.transportSelectors.playPauseIcon.src = "images/button-icons/pause-circle.svg";
  }

  pause() {
    this.track.pause();
    this.isPlaying = false;
    this.transportSelectors.playPauseIcon.src = "images/button-icons/play-circle.svg";
  }

  prev() {
    this.load((this.currentTrackIndex - 1 + trackList.length) % trackList.length);
    this.play();
  }

  next() {
    this.load((this.currentTrackIndex + 1 + trackList.length) % trackList.length);
    this.play();
  }

  toggle() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  resetTransport() {
    this.transportSelectors.currentTime.textContent = "00:00";
    this.transportSelectors.totalDuration.textContent = "00:00";
    this.transportSelectors.slider.value = 0;
  }

  seekTo() {
    this.track.currentTime = this.track.duration * (this.transportSelectors.slider.value / 100);
  }

  seekUpdate() {
    if (!isNaN(this.track.duration)) {
      this.transportSelectors.slider.value = this.track.currentTime * (100 / this.track.duration);

      let currentMinutes = this._pad(Math.floor(this.track.currentTime / 60));
      let currentSeconds = this._pad(Math.floor(this.track.currentTime - currentMinutes * 60));
      let durationMinutes = this._pad(Math.floor(this.track.duration / 60));
      let durationSeconds = this._pad(Math.floor(this.track.duration - durationMinutes * 60));

      this.transportSelectors.currentTime.textContent = currentMinutes + ":" + currentSeconds;
      this.transportSelectors.totalDuration.textContent = durationMinutes + ":" + durationSeconds;
    }
  }

  _pad(n) {
    return (n < 10) ? ("0" + n) : n;
  }
}


const main = function() {
  let modal = new Modal();
  let audioPlayer = new AudioPlayer();
}

main();








