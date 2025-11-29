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
  selector: 'app-link-statistics',
  templateUrl: './link-statistics.html',
  styleUrls: ['./link-statistics.scss'],
  imports: [CommonModule, FormsModule],
})
export class LinkStatisticsComponent {
  private readonly apiUrl = 'https://gaol6pp3z0.execute-api.us-east-2.amazonaws.com/dev';

  shortCode = '';
  statistics: LinkStatistics | null = null;
  dailyStats: DailyStat[] = [];
  filteredStats: DailyStat[] = [];

  isLoading = false;
  error = '';

  selectedDate: string | null = null;
  dateRange = { start: '', end: '' };

  constructor(private http: HttpClient) { }

  searchStatistics(): void {
    if (!this.shortCode.trim()) {
      this.setError('Por favor ingresa un código de enlace');
      return;
    }

    this.fetchStatistics(`${this.apiUrl}/status/${this.shortCode}`);
  }

  searchByDateRange(): void {
    if (!this.shortCode.trim()) {
      this.setError('Ingresa un código de enlace');
      return;
    }

    if (!this.dateRange.start || !this.dateRange.end) {
      this.setError('Selecciona ambas fechas');
      return;
    }

    const url = `${this.apiUrl}/status/${this.shortCode}?start_date=${this.dateRange.start}&end_date=${this.dateRange.end}`;
    this.fetchStatistics(url);
  }

  filterByDate(): void {
    if (!this.statistics) return;

    if (!this.selectedDate) {
      this.filteredStats = [...this.dailyStats].reverse();
      return;
    }

    this.filteredStats = this.dailyStats.filter(stat => stat.date === this.selectedDate);
  }

  private fetchStatistics(url: string): void {
    this.resetState();

    this.http.get<any>(url).subscribe({
      next: (response) => this.processResponse(response),
      error: () => this.setError('No se encontraron datos para este enlace'),
    });
  }

  private processResponse(response: any): void {
    this.dailyStats = response.visits_by_day
      ? Object.entries(response.visits_by_day)
        .map(([date, visits]) => ({
          date,
          visits: Number(visits),
        }))
        .reverse()
      : [];

    this.statistics = {
      totalVisitsEver: response.total_visits_ever,
      reportSummary: response.current_report_summary,
      visitsInPeriod: response.visits_in_report_period,
      dailyStats: this.dailyStats,
    };

    this.filteredStats = [...this.dailyStats];
    this.isLoading = false;
  }

  private resetState(): void {
    this.error = '';
    this.statistics = null;
    this.filteredStats = [];
    this.dailyStats = [];
    this.isLoading = true;
  }

  private setError(message: string): void {
    this.error = message;
    this.isLoading = false;
  }
}