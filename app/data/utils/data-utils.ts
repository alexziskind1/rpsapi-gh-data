import { PtUser } from "../../shared/models/domain";
import { PriorityEnum, StatusEnum } from "../../shared/models/domain/enums";
import { PtItemStatusType, PtItemType } from "../../shared/models/domain/types";


export function getNextId(arr: number[]) {
    if (arr.length === 0) {
      return 1;
    }
    return Math.max(...arr) + 1;
}


export function getRandomUser(allUsers: PtUser[]): PtUser {
    const user = allUsers[Math.floor(Math.random() * allUsers.length)];
    return user;
}

export function getRandomPtItemType(): PtItemType {
    const randPtItemTypeIdx: number = Math.floor(Math.random() * 4) + 1;
    switch (randPtItemTypeIdx) {
        case 1:
            return 'Bug';
        case 2:
            return 'Chore';
        case 3:
            return 'Impediment';
        case 4:
            return 'PBI';
        default: 
            return 'PBI';
    }
}

export function getRandomPriority(): PriorityEnum {
    const randPriorityIdx: number = Math.floor(Math.random() * 4) + 1;
    switch (randPriorityIdx) {
        case 1:
            return PriorityEnum.Low;
        case 2:
            return PriorityEnum.Medium;
        case 3:
            return PriorityEnum.High;
        case 4:
            return PriorityEnum.Critical;
        default: 
            return PriorityEnum.Medium;
    }
}


export function getRandomStatus(): StatusEnum {
    const randStatusIdx: number = Math.floor(Math.random() * 4) + 1;
    switch (randStatusIdx) {
        case 1:
            return StatusEnum.Submitted;
        case 2:
            return StatusEnum.Open;
        case 3:
            return StatusEnum.Closed;
        case 4:
            return StatusEnum.ReOpened;
        default: 
            return StatusEnum.Open;
    }
}


export function getRandomDateBetween(start: Date, end: Date) {
    const startTime = start.getTime();
    const endTime = end.getTime();
    if (startTime > endTime) {
        throw new Error('Start date must be earlier than end date.');
    }
    const randomTime = startTime + Math.random() * (endTime - startTime);
    return new Date(randomTime);
}


export function getRandomDateWithinLastYear() {
    const oneYearAgo = new Date(new Date().setFullYear(new Date().getFullYear() - 1));
    const ranDate = getRandomDateBetween(oneYearAgo, new Date());
    return ranDate;
}