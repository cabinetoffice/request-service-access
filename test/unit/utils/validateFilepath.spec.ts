import { describe, afterEach, expect, test, jest } from '@jest/globals';

import { Request, Response } from 'express';
import path from 'path';

import { validateFilepath } from '../../../src/utils/validateFilepath';
import * as config from '../../../src/config/index';

import { mockRequest, mockResponse } from '../../mock/express.mock';

describe('validateFilepath util tests', () => {

    let res: Response;

    beforeEach(() => {
        res = mockResponse();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    test(`should return a valid filepath which starts with ${config.ROOT_URL}`, () => {

        const validFilepath = '/home';
        const req = { ...mockRequest(), path: validFilepath } as unknown as Request;

        const normalisedPath = validateFilepath(req, res);

        const expectedNormalisedPath = '/home';
        expect(normalisedPath).toBe(expectedNormalisedPath);

    });

    test(`should normalise a malicious filepath and return the normalised path if it starts with ${config.ROOT_URL}`, () => {

        const maliciousPathTraveralFilepath = '../../../home';
        const req = { ...mockRequest(), path: maliciousPathTraveralFilepath } as Request;

        const normalisedPath = validateFilepath(req, res);

        const expectedNormalisedPath = '/home';
        expect(normalisedPath).toBe(expectedNormalisedPath);

    });

    test(`should render error page if filepath does not start with ${config.ROOT_URL}`, () => {

        // mock path.resolve to return a filepath not starting with root url
        const spyPathResolve = jest.spyOn(path, 'resolve');
        const filePathNotStartingWithRootUrl = 'home';
        spyPathResolve.mockReturnValue(filePathNotStartingWithRootUrl);

        const req = { ...mockRequest(), path: filePathNotStartingWithRootUrl } as Request;

        validateFilepath(req, res);

        expect(res.render).toHaveBeenCalledTimes(1);
        expect(res.render).toHaveBeenCalledWith(config.ERROR_PAGE);

    });

});
