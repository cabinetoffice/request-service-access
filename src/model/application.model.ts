import { Member } from './github/member.model';
import { AddTeam } from './add-team.model';
import { Repo } from './github/repo.model';
import { AddTeamMember } from './add-team-member.model';
import { AdditionalRequests } from './additional-requests.model';
import { Collaborator } from './github/collaborator.model';

/*
All the field names in the page models must exactly match the `name` attributes in the corresponding elements of the HTML pages. This ensures the models can be correctly mapped to the form data.
*/

export interface ApplicationData {
  members?: Member[]
  add_team?: AddTeam[]
  repos?: Repo[]
  add_team_member?: AddTeamMember[]
  collaborator?: Collaborator[]
  additional_requests?: AdditionalRequests[]
}

