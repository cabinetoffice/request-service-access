// import { Request, Response } from 'express';
// import * as config from '../config';

// export const get = (_req: Request, res: Response) => {
//     return res.render(config.ADD_MEMBER);
// };
// // export const post = (_req: Request, res: Response) => {
// //     return res.render('post request test');
// // };
import { Request, Response } from 'express';
import { log } from '../utils/logger';
import * as config from '../config';

export const get = (_req: Request, res: Response) => {
    return res.render(config.ADD_MEMBER);
};

export const post = (req: Request, res: Response) => {

    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const gitHubHandle = req.body.gitHubHandle;
    const emailAddress = req.body.emailAddress;
    const description = req.body.description;

    // validation middleware and data assignment to be implemented

    log.info(`firstName: ${firstName} lastName: ${lastName}, Github Handle: ${gitHubHandle}, emailAddress: ${emailAddress}, description : ${description} `);

    return res.redirect(config.LANDING);
};
