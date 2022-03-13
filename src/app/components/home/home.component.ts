import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator} from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { DialogComponent } from '../dialog/dialog.component';
import { ShopService } from '../../services/shop.service';
import { MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { Router } from '@angular/router';
import { Shop } from '../../model/shop';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'chukkhuwala';
  shopData:any=[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  obs: Observable<any>;
  dataSource: MatTableDataSource<Shop>;
  changeDetectorRef: any;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );

  constructor(private breakpointObserver: BreakpointObserver,private dialog:MatDialog,private shopservice:ShopService,public afAuth:AngularFireAuth,public router:Router){}

  ngOnInit(): void {
    this.getAllShops();
  }


  signIn(){
    const googleAuthProvider=new firebase.auth.GoogleAuthProvider();
    this.afAuth.signInWithPopup(googleAuthProvider);
  }

  signOut(){
    this.afAuth.signOut();
  }

  async openDialog() {
    const user = await this.afAuth.currentUser;
    const isAuthenticated = user ? true: false;

    if(!isAuthenticated){
      this.router.navigate(['signin'])
    }
    else{
      this.dialog.open(DialogComponent, {
        width:'100%',
      }).afterClosed().subscribe(val=>{
        if(val==='save'){
          this.getAllShops();
        }
      })
    }
  }

  getAllShops(){
    this.shopservice.getProduct().subscribe((res:any)=>{
      this.dataSource=new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort=this.sort;
      this.obs = this.dataSource.connect();
    },error=>{
      alert('Some error occurred while fetching Shops :[')
    })
  }

  editShop(shopData:any){
    this.dialog.open(DialogComponent,{
      width:'100%',
      data: shopData
    }).afterClosed().subscribe(val=>{
      if(val==='update'){
        this.getAllShops();
      }
    })
  }

  deleteShop(id:number){
    this.shopservice.deleteShop(id).subscribe((res)=>{
      alert('Shop deleted successfully');
      this.getAllShops();
    }),
    error=>{
      alert('Shop was not deleted successfully');
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnDestroy(): void {
    if (this.dataSource) { this.dataSource.disconnect(); }
  }

}
