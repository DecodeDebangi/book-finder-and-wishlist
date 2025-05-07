import {IsDateString, IsNotEmpty, IsString, IsUrl } from "class-validator";

export class CreateBooksDTO{
    @IsString()
    @IsNotEmpty()
    readonly title!: string;

    @IsString()
    @IsNotEmpty()
    readonly author!: string;

    @IsString()
    @IsUrl()
    readonly coverUrl!: string;

    @IsNotEmpty()
    @IsDateString()
    readonly releaseDate!: Date;

    @IsNotEmpty()
    readonly pages!: number;
}
