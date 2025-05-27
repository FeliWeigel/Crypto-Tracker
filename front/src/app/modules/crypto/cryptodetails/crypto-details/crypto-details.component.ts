import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MenuComponent } from '../../../../public/menu/menu.component';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CryptoGraphComponent } from '../crypto-graph/crypto-graph.component';
import { CryptoService } from '../../../../services/crypto/crypto.service';
import { ShortenNumberPipe } from '../../../../utils/shorten-number.pipe';
@Component({
  selector: 'app-crypto-details',
  imports: [CommonModule, MenuComponent, CryptoGraphComponent, ShortenNumberPipe],
  templateUrl: './crypto-details.component.html',
  styleUrl: './crypto-details.component.css'
})
export class CryptoDetailsComponent implements OnInit, OnDestroy{
  private route = inject(ActivatedRoute)
  private cryptoService = inject(CryptoService)
  cryptoId!: string
  crypto:any = []
  constructor(){

  }

  ngOnInit(): void {
    this.cryptoId = this.route.snapshot.paramMap.get('id')!;
    this.cryptoService.getCryptoDetails(this.cryptoId).subscribe({
      next: (res) => {
        console.log(res)
        this.crypto = res
      }
    })
  }

  ngOnDestroy(): void {
  }
}
