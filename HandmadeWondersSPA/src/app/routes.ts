import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { LoggedUserGuard } from './_guards/logged-user.guard';
import { AdminGuard } from './_guards/admin.guard';
import { AccountManagementComponent } from './account-management/account-management.component';
import { PostsListComponent } from './posts-list/posts-list.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { PostComponent } from './post/post.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { AdminComponent } from './admin/admin.component';
import { UserListComponent } from './user-list/user-list.component';
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

// tslint:disable-next-line: one-variable-per-declaration
export const routes: Routes =
    [
        { path: '', component: HomeComponent },
        { path: 'home', component: HomeComponent },
        { path: 'contact', component: ContactComponent },
        { path: 'about', component: AboutComponent },
        { path: 'admin', component: AdminComponent, canActivate: [AdminGuard] },
        { path: 'posts-list/:category', component: PostsListComponent },
        { path: 'account-management', component: AccountManagementComponent, canActivate: [LoggedUserGuard] },
        { path: 'create-post', component: CreatePostComponent, canActivate: [AdminGuard] },
        { path: 'edit-post/:id', component: EditPostComponent, canActivate: [AdminGuard] },
        { path: 'posts/:id', component: PostComponent, canActivate: [LoggedUserGuard] },
        { path: 'users/:id', component: UserDetailsComponent, canActivate: [AdminGuard] },
        { path: 'users', component: UserListComponent, canActivate: [AdminGuard] },
        { path: 'login', component: LoginComponent },
        { path: 'register', component: RegisterComponent },
        { path: '**', component: NotFoundComponent }
    ]