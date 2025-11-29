import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Config {
  private readonly config = {
    backendUrl: this.getBackendUrl(),
    production: this.isProduction()
  };

  private getBackendUrl(): string {
    // Puedes cambiar esto según tu entorno
    if (this.isProduction()) {
      return 'https://gaol6pp3z0.execute-api.us-east-2.amazonaws.com/dev';
    }
    return 'https://gaol6pp3z0.execute-api.us-east-2.amazonaws.com/dev';
  }

  private isProduction(): boolean {
    return window.location.hostname !== 'localhost';
  }

  get backendUrl(): string {
    return this.config.backendUrl;
  }

  get isProductionMode(): boolean {
    return this.config.production;
  }
}
