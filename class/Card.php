<?php

class Card {
    public int $id;
    public string $companyName;
    public string $jobTypeDetail;
    public string $businessDetail;
    public int $salaryYMin;
    public int $salaryYMax;
    public string $workingType;
    public string $workingPlace;
    public string $workingTime;
    public string $createdAt;

    public function __construct(int $id, string $companyName, string $jobTypeDetail, string $businessDetail, int $salaryYMin, int $salaryYMax, string $workingType, string $workingPlace, string $workingTime, string $createdAt)
    {
        $this->id = $id;
        $this->companyName = $companyName;
        $this->jobTypeDetail = $jobTypeDetail;
        $this->businessDetail = $businessDetail;
        $this->salaryYMin = $salaryYMin;
        $this->salaryYMax = $salaryYMax;
        $this->workingType = $workingType;
        $this->workingPlace = $workingPlace;
        $this->workingTime = $workingTime;
        $this->createdAt = $createdAt;
    }

}

?>

