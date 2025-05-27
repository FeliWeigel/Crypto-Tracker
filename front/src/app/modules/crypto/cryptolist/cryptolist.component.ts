import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { CryptoService } from '../../../services/crypto/crypto.service';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../../public/menu/menu.component';
import { ShortenNumberPipe } from '../../../utils/shorten-number.pipe';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-cryptolist',
  imports: [RouterModule, RouterLink, CommonModule, MenuComponent, ShortenNumberPipe],
  standalone: true,
  templateUrl: './cryptolist.component.html',
  styleUrl: './cryptolist.component.css'
})
export class CryptolistComponent implements OnInit, OnDestroy {
  cryptos:any = []
  constructor(private cryptoService: CryptoService) {
  }
  
  ngOnDestroy(): void {
  }

  ngOnInit(): void {
    this.listCryptos()

    setInterval(() => {
      this.listCryptos();
    }, 60000); 
  }

  listCryptos(){
    this.cryptoService.getCryptos().subscribe(
      {
        next : (data: any) => {
          this.cryptos = data
        },
      }
    )
  }

}
