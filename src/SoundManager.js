// src/SoundManager.js
// Audio playback (SYSTEM layer).
//
// Responsibilities:
// - Load sound assets during preload() (via loadSound)
// - Play sounds by key (SFX/music)
// - Provide a simple abstraction so gameplay code never touches audio directly
//
// Non-goals:
// - Does NOT subscribe to EventBus directly (Game wires events → play())
// - Does NOT decide when events happen (WORLD logic emits events)
// - Does NOT manage UI
//
// Architectural notes:
// - Game connects EventBus events (leaf:collected, player:damaged, etc.) to SoundManager.play().
// - This keeps audio concerns isolated from gameplay and supports easy swapping/muting.

export class SoundManager {
  constructor() {
    this.sfx = {};
    this._music = null;
  }

  load(name, path) {
    this.sfx[name] = loadSound(path);
  }

  register(name, sound) {
    this.sfx[name] = sound;
  }

  play(name) {
    const s = this.sfx[name];
    if (!s) return;
    if (s.isPlaying()) s.stop();
    s.play();
  }

  playMusic(name, volume = 0.4) {
    const s = this.sfx[name];
    if (!s) return;
    this._music = s;
    s.setLoop(true);
    s.setVolume(volume);
    if (!s.isPlaying()) s.play();
  }

  stopMusic() {
    this._music?.stop();
  }
  pauseMusic() {
    this._music?.pause();
  }
  resumeMusic() {
    if (this._music && !this._music.isPlaying()) this._music.play();
  }
  setMusicVolume(v) {
    this._music?.setVolume(v);
  }
}
