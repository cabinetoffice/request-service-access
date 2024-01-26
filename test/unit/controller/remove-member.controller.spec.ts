import { describe, expect, afterEach, test, jest } from '@jest/globals';
import { Request, Response } from 'express';

import { get, post } from '../../../src/controller/remove-member.controller';
import * as config from '../../../src/config';
import { log } from '../../../src/utils/logger';

import { MOCK_POST_REMOVE_MEMBER } from '../../mock/data';
import { MOCK_POST_REMOVE_MEMBER_RESPONSE } from '../../mock/text.mock';

jest.mock('../../../src/utils/logger', () => ({
    log: {
        info: jest.fn()
    }
}));

const req = {
    body: MOCK_POST_REMOVE_MEMBER
} as Request;

const mockResponse = () => {
    const res = {} as Response;
    res.render = jest.fn().mockReturnValue(res) as any;
    res.send = jest.fn().mockReturnValue(res) as any;
    res.redirect = jest.fn().mockReturnValue(res) as any;
    return res;
};

describe('Remove-member controller test suites', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('remove-member GET tests', () => {

        test('should render remove-member page', () => {
            const res = mockResponse();

            get(req, res);

            expect(res.render).toHaveBeenCalledWith(config.REMOVE_MEMBER);
        });
    });

    describe('remove-member POST tests', () => {

        test('should redirect to landing-page on POST request', () => {
            const res = mockResponse();

            post(req, res);

            expect(res.redirect).toBeCalledWith(config.LANDING);
        });
        test('should log GitHub handle and More Details on POST request', () => {
            const res = mockResponse();

            const infoSpy = jest.spyOn(log, 'info');

            post(req, res);

            expect(infoSpy).toHaveBeenCalledWith(MOCK_POST_REMOVE_MEMBER_RESPONSE);
        });
    });
});
