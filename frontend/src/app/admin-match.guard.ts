import { Injectable } from "@angular/core";
import { CanMatch, Route, UrlSegment } from "@angular/router";
import { UserService } from "./services/user.service";

@Injectable({
  providedIn: "root",
})
export class AdminMatchGuard implements CanMatch {
  constructor(private userService: UserService) { }

  async canMatch(route: Route, segments: UrlSegment[]): Promise<boolean> {
    const user = await this.userService.getRoles("admin")
    return user.isAdmin === true;
  }
}
