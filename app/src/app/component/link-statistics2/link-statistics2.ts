import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface DailyStat {
  date: string;
  visits: number;
}

interface LinkStatistics {
  totalVisitsEver: number;
  reportSummary: string;
  visitsInPeriod: number;
  dailyStats: DailyStat[];
}

@Component({
  selector: 'app-link-statistics2',
  templateUrl: './link-statistics2.html',
  styleUrls: ['./link-statistics2.scss'],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class LinkStatisticsComponent2 {
  backendUrl = 'https://gaol6pp3z0.execute-api.us-east-2.amazonaws.com/dev';

  shortCode = '';
  statistics: LinkStatistics | null = null;

  /** 🔥 Declaración faltante */
  dailyStats: DailyStat[] = [];

  filteredStats: DailyStat[] = [];

  isLoading = false;
  error = '';

  selectedDate: string | null = null;
  dateRange = { start: '', end: '' };

  constructor(private http: HttpClient) { }

  /** ➤ Buscar estadísticas generales */
  searchStatistics(): void {
    if (!this.shortCode.trim()) {
      this.error = 'Por favor ingresa un código de enlace.';
      return;
    }

    this.resetState();

    const url = `${this.backendUrl}/status/${this.shortCode}`;

    this.http.get<any>(url).subscribe({
      next: (resp) => this.processResponse(resp),
      error: () => this.showError(),
    });
  }

  /** ➤ Buscar estadísticas por rango de fechas */
  searchByDateRange(): void {
    if (!this.shortCode.trim()) {
      this.error = 'Ingresa código de enlace.';
      return;
    }

    if (!this.dateRange.start || !this.dateRange.end) {
      this.error = 'Selecciona un rango de fechas.';
      return;
    }

    this.resetState();

    const url = `${this.backendUrl}/status/${this.shortCode}?start_date=${this.dateRange.start}&end_date=${this.dateRange.end}`;

    this.http.get<any>(url).subscribe({
      next: (resp) => this.processResponse(resp),
      error: () => this.showError(),
    });
  }

  /** ➤ Procesar respuesta */
  processResponse(resp: any) {
    if (resp.visits_by_day) {
      this.dailyStats = Object.entries(resp.visits_by_day).map(([date, visits]) => ({
        date,
        visits: Number(visits),
      }));
    } else {
      this.dailyStats = [];
    }

    this.statistics = {
      totalVisitsEver: resp.total_visits_ever,
      reportSummary: resp.current_report_summary,
      visitsInPeriod: resp.visits_in_report_period,
      dailyStats: this.dailyStats, // FIX
    };

    this.filteredStats = [...this.dailyStats].reverse(); // FIX
    this.isLoading = false;
  }

  /** ➤ Filtro por fecha individual */
  filterByDate() {
    if (!this.statistics) return;

    if (!this.selectedDate) {
      this.filteredStats = [...this.statistics.dailyStats].reverse();
      return;
    }

    this.filteredStats = this.statistics.dailyStats.filter(
      (x) => x.date === this.selectedDate
    );
  }

  /** ➤ Utilidades */
  resetState() {
    this.error = '';
    this.statistics = null;
    this.filteredStats = [];
    this.dailyStats = [];
    this.isLoading = true;
  }

  showError() {
    this.error = 'No se encontraron datos para este enlace.';
    this.isLoading = false;
  }
}
