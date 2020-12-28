import { LoggedUserGuard } from './_guards/logged-user.guard';
import { AdminGuard } from './_guards/admin.guard';
import { PostService } from './_services/post.service';
import { HttpService } from './_services/http.service';
import { AuthService } from './_services/auth.service';
import { routes } from './routes';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap/collapse';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserListComponent } from './user-list/user-list.component';
import { AdminComponent } from './admin/admin.component';
import { PostComponent } from './post/post.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { EditPostComponent } from './edit-post/edit-post.component';
import { PostsListComponent } from './posts-list/posts-list.component';
import { AccountManagementComponent } from './account-management/account-management.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { FooterComponent } from './footer/footer.component';
import { LikeComponent } from './like/like.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    UserDetailsComponent,
    NotFoundComponent,
    LoginComponent,
    RegisterComponent,
    UserListComponent,
    AdminComponent,
    PostComponent,
    CreatePostComponent,
    EditPostComponent,
    PostsListComponent,
    AccountManagementComponent,
    ContactComponent,
    AboutComponent,
    FooterComponent,
    LikeComponent
  ],
  imports: [
    FormsModule,
    CKEditorModule,
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    CollapseModule.forRoot()
  ],
  providers: [
    AuthService,
    HttpService,
    PostService,
    AdminGuard,
    LoggedUserGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
