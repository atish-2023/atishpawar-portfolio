import { Injectable } from '@angular/core';
import confetti from 'canvas-confetti';

@Injectable({
  providedIn: 'root'
})
export class ConfettiService {
  /**
   * Trigger confetti animation at the center of the screen
   * @param duration Duration in milliseconds (default: 3000ms)
   */
  triggerConfetti(duration: number = 3000): void {
    // Create confetti animation
    const end = Date.now() + duration;
    
    const colors = ['#FF577F', '#FF884B', '#FFD384', '#A0D995', '#8ACDD7', '#B084CC'];
    
    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 75,
        origin: { x: 0, y: 0.8 },
        colors: colors,
        zIndex: 10000
      });
      
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 75,
        origin: { x: 1, y: 0.8 },
        colors: colors,
        zIndex: 10000
      });
      
      confetti({
        particleCount: 5,
        angle: 90,
        spread: 120,
        origin: { x: 0.5, y: 1 },
        colors: colors,
        zIndex: 10000,
        gravity: 1.5,
        scalar: 1.2
      });
      
      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    
    frame();
  }
  
  /**
   * Simple center confetti burst
   * @param duration Duration in milliseconds (default: 3000ms)
   */
  triggerCenterConfetti(duration: number = 3000): void {
    const count = 200;
    const defaults = { 
      origin: { y: 0.5, x: 0.5 },
      zIndex: 10000
    };

    const fire = (particleRatio: number, opts: any) => {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      });
    };

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });
    
    fire(0.2, {
      spread: 60,
    });
    
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8
    });
    
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2
    });
    
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
    
    // Stop after specified duration
    setTimeout(() => {
      confetti.reset();
    }, duration);
  }
}