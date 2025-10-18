class FootballPlayer {
    static GOAL_SONGS = [
        'songs/goal/goal (1).mp3',
        'songs/goal/goal (2).mp3',
        'songs/goal/goal (3).mp3',
        'songs/goal/goal (4).mp3'
    ];

    static BREAK_SONGS = [
        'songs/break/break (1).mp3',
        'songs/break/break (2).mp3',
        'songs/break/break (3).mp3',
        'songs/break/break (4).mp3',
        'songs/break/break (5).mp3',
        'songs/break/break (6).mp3',
        'songs/break/break (7).mp3',
        'songs/break/break (8).mp3',
    ];

    static SIREN_SONG = 'songs/siren.mp3';

    constructor() {
        this.currentGoalAudio = null;
        this.currentBreakAudio = null;
        this.currentSirenAudio = null;
        
        this.usedBreakSongs = new Set();
        this.lastGoalSong = null;
        
        this.isPlaying = false;
        this.currentlyPlaying = null;
        
        this.isFadingOut = false;
        this.fadeInterval = null;
        this.currentFadeAudio = null;

        // Просто флаг для автоматического продолжения
        this.isAutoBreakMode = false;
    }

    playRandomGoal() {
        if (this.isFadingOut) {
            this._stopFadeOut();
        }
        
        // Останавливаем автоматический режим перерыва
        this.isAutoBreakMode = false;
        
        this.stopAllTracks();
        
        const availableSongs = FootballPlayer.GOAL_SONGS.filter(song => 
            song !== this.lastGoalSong
        );

        const songsToUse = availableSongs.length > 0 ? availableSongs : FootballPlayer.GOAL_SONGS;

        const randomIndex = Math.floor(Math.random() * songsToUse.length);
        const selectedSong = songsToUse[randomIndex];

        this.lastGoalSong = selectedSong;

        this.currentGoalAudio = new Audio(selectedSong);
        this.currentGoalAudio.play();
        this.isPlaying = true;
        this.currentlyPlaying = 'goal';

        this.currentGoalAudio.onended = () => {
            this.isPlaying = false;
            this.currentlyPlaying = null;
        };

        console.log(`Воспроизводится гол: ${selectedSong}`);
        return selectedSong;
    }

    playRandomBreak() {
        if (this.isFadingOut) {
            this._stopFadeOut();
        }
        
        this.stopAllTracks();

        if (this.usedBreakSongs.size >= FootballPlayer.BREAK_SONGS.length) {
            console.warn('Все треки для перерыва уже использованы в турнире');
            this.isAutoBreakMode = false; // Выключаем авторежим когда треки закончились
            return null;
        }

        const availableSongs = FootballPlayer.BREAK_SONGS.filter(song => 
            !this.usedBreakSongs.has(song)
        );

        if (availableSongs.length === 0) {
            console.warn('Нет доступных треков для перерыва');
            this.isAutoBreakMode = false;
            return null;
        }

        const randomIndex = Math.floor(Math.random() * availableSongs.length);
        const selectedSong = availableSongs[randomIndex];

        this.usedBreakSongs.add(selectedSong);

        this.currentBreakAudio = new Audio(selectedSong);
        this.currentBreakAudio.play();
        this.isPlaying = true;
        this.currentlyPlaying = 'break';

        // Обработчик завершения - если активен авторежим, запускаем следующий трек
        this.currentBreakAudio.onended = () => {
            console.log(`Завершен трек перерыва: ${selectedSong}`);
            this.isPlaying = false;
            this.currentlyPlaying = null;

            if (this.isAutoBreakMode) {
                // Пауза и запуск следующего трека
                setTimeout(() => {
                    console.log('Автоматически запускается следующий трек перерыва');
                    this.playRandomBreak();
                }, 100);
            }
        };

        console.log(`Воспроизводится перерыв: ${selectedSong}`);
        return selectedSong;
    }

    // Новый метод для запуска автоматической последовательности
    startAutoBreak() {
        this.isAutoBreakMode = true;
        console.log('Запущен автоматический режим перерыва');
        return this.playRandomBreak();
    }

    // Метод для остановки автоматического режима
    stopAutoBreak() {
        this.isAutoBreakMode = false;
        console.log('Автоматический режим перерыва остановлен');
    }

    playSiren() {
        if (this.isFadingOut) {
            this._stopFadeOut();
        }
        
        // Останавливаем автоматический режим
        this.isAutoBreakMode = false;
        
        this.stopAllTracks();

        this.currentSirenAudio = new Audio(FootballPlayer.SIREN_SONG);
        this.currentSirenAudio.play();
        this.isPlaying = true;
        this.currentlyPlaying = 'siren';

        this.currentSirenAudio.onended = () => {
            this.isPlaying = false;
            this.currentlyPlaying = null;
        };

        console.log('Воспроизводится сирена');
        return FootballPlayer.SIREN_SONG;
    }

    stopAllTracks() {
        if (this.isFadingOut) {
            this._stopFadeOut();
        }

        const tracks = [this.currentGoalAudio, this.currentBreakAudio, this.currentSirenAudio];
        
        tracks.forEach(track => {
            if (track) {
                track.pause();
                track.currentTime = 0;
                track.volume = 1.0;
            }
        });

        this.isPlaying = false;
        this.currentlyPlaying = null;
    }

    fadeOut(duration = 3000) {
        if (!this.isPlaying || this.currentlyPlaying === 'siren') {
            console.log('Нет активного трека для fade out или это сирена');
            return;
        }

        if (this.isFadingOut) {
            this._stopFadeOut();
        }

        let currentAudio = null;
        
        switch (this.currentlyPlaying) {
            case 'goal':
                currentAudio = this.currentGoalAudio;
                break;
            case 'break':
                currentAudio = this.currentBreakAudio;
                break;
            default:
                console.log('Тип трека не поддерживает fade out');
                return;
        }

        if (!currentAudio) return;

        this.isFadingOut = true;
        this.currentFadeAudio = currentAudio;

        const initialVolume = currentAudio.volume;
        const stepTime = 50;
        const steps = duration / stepTime;
        const volumeStep = initialVolume / steps;

        this.fadeInterval = setInterval(() => {
            if (currentAudio.volume > volumeStep) {
                currentAudio.volume -= volumeStep;
            } else {
                this._completeFadeOut();
            }
        }, stepTime);
    }

    _completeFadeOut() {
        if (this.fadeInterval) {
            clearInterval(this.fadeInterval);
            this.fadeInterval = null;
        }

        if (this.currentFadeAudio) {
            this.currentFadeAudio.pause();
            this.currentFadeAudio.currentTime = 0;
            this.currentFadeAudio.volume = 1.0;
            this.currentFadeAudio = null;
        }

        this.isFadingOut = false;
        this.isPlaying = false;
        this.currentlyPlaying = null;
        console.log('Fade out завершен');
    }

    _stopFadeOut() {
        if (this.fadeInterval) {
            clearInterval(this.fadeInterval);
            this.fadeInterval = null;
        }

        if (this.currentFadeAudio) {
            this.currentFadeAudio.volume = 1.0;
            this.currentFadeAudio = null;
        }

        this.isFadingOut = false;
        console.log('Fade out прерван');
    }

    resetTournament() {
        this.usedBreakSongs.clear();
        this.lastGoalSong = null;
        this.isAutoBreakMode = false;
        console.log('История треков сброшена для нового турнира');
    }

    isPlayingTrack() {
        return this.isPlaying;
    }

    getCurrentlyPlaying() {
        return this.currentlyPlaying;
    }

    isFadingOutTrack() {
        return this.isFadingOut;
    }

    // Геттер для проверки авторежима
    isAutoBreakModeActive() {
        return this.isAutoBreakMode;
    }

    getPlaybackStats() {
        return {
            lastGoalSong: this.lastGoalSong,
            usedBreakSongs: Array.from(this.usedBreakSongs),
            totalGoalSongs: FootballPlayer.GOAL_SONGS.length,
            totalBreakSongs: FootballPlayer.BREAK_SONGS.length,
            isAutoBreakMode: this.isAutoBreakMode
        };
    }
}