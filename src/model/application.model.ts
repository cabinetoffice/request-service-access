import { AddMember } from './add-member.model';
import { AddTeam } from './add-team.model';
import { AddRepo } from './add-repo.model';

/*
All the field names in the page models must exactly match the `name` attributes in the corresponding elements of the HTML pages. This ensures the models can be correctly mapped to the form data.
*/

export interface ApplicationData {
  add_member?: AddMember
  add_team?: AddTeam
  add_repo?: AddRepo
}

