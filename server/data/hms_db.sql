-- phpMyAdmin SQL Dump
-- version 4.5.0.2
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Dec 18, 2016 at 03:39 PM
-- Server version: 10.0.17-MariaDB
-- PHP Version: 5.6.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hms_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `department_table`
--

CREATE TABLE `department_table` (
  `dep_id` int(11) NOT NULL,
  `dep_name` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `department_table`
--

INSERT INTO `department_table` (`dep_id`, `dep_name`) VALUES
(1, 'Anaesthetics'),
(2, 'Breast screening'),
(3, 'Cardiology'),
(4, 'Chaplaincy');

-- --------------------------------------------------------

--
-- Table structure for table `doctor_table`
--

CREATE TABLE `doctor_table` (
  `doct_id` int(11) NOT NULL,
  `doct_name` text NOT NULL,
  `doct_price` int(11) NOT NULL,
  `dep_id` int(11) NOT NULL,
  `doct_location` text NOT NULL,
  `doct_timing` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `doctor_table`
--

INSERT INTO `doctor_table` (`doct_id`, `doct_name`, `doct_price`, `dep_id`, `doct_location`, `doct_timing`) VALUES
(1, 'Dr.Santosh Majhi', 500, 1, 'First Floor Room No-1', 'Sun-Sat (10:00 AM To 05:00 PM)'),
(2, 'Dr. Suresh Sahoo', 400, 1, 'First Floor Room No-2', 'Sun-Sat (10:00 AM To 05:00 PM)');

-- --------------------------------------------------------

--
-- Table structure for table `patient_previous_history`
--

CREATE TABLE `patient_previous_history` (
  `his_id` int(11) NOT NULL,
  `reg_id` int(11) NOT NULL,
  `disease` text,
  `hospital_name` text,
  `doct_name` text,
  `date_of_consulation` date DEFAULT NULL,
  `is_admited` text,
  `discharge_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `registration_table`
--

CREATE TABLE `registration_table` (
  `reg_id` int(11) NOT NULL,
  `reg_no` text NOT NULL,
  `registration_type` text NOT NULL,
  `name` text NOT NULL,
  `last_name` text NOT NULL,
  `gender` text NOT NULL,
  `mobile` text NOT NULL,
  `email` text NOT NULL,
  `street` text NOT NULL,
  `city` text NOT NULL,
  `state` text NOT NULL,
  `zip` text NOT NULL,
  `dob` date NOT NULL,
  `age` text NOT NULL,
  `marital_status` text NOT NULL,
  `religion` text NOT NULL,
  `prof_type` text,
  `school` text,
  `employer` text,
  `business_type` text,
  `other` text,
  `guardian_type` text,
  `guardian_name` text,
  `guardian_mobile` text,
  `address` text,
  `dep_id` int(11) DEFAULT NULL,
  `doct_id` int(11) DEFAULT NULL,
  `hear_about_us` text,
  `reason` text,
  `reg_date` date NOT NULL,
  `is_deleted` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `registration_table`
--

INSERT INTO `registration_table` (`reg_id`, `reg_no`, `registration_type`, `name`, `last_name`, `gender`, `mobile`, `email`, `street`, `city`, `state`, `zip`, `dob`, `age`, `marital_status`, `religion`, `prof_type`, `school`, `employer`, `business_type`, `other`, `guardian_type`, `guardian_name`, `guardian_mobile`, `address`, `dep_id`, `doct_id`, `hear_about_us`, `reason`, `reg_date`, `is_deleted`) VALUES
(20, 'HMS/16/20', 'OPD', 'Santosh Kumar Shann', '', 'Male', '9078640778', 'santoshmajhi99@gmail.com', 'Sahid nagar', 'Bhubaneswar', 'Odisha', 'fff777777', '1992-09-07', '24 years, 3 months, and 10 days', 'Unmarried', '', 'Employee', '', 'Teknobiz Solutions', '', '', 'Father', 'Chandra sekhar Majhi', '9438753143', 'asdfasfasfasdf  asf asdfa sf', 1, 2, '', '', '2016-12-17', 0),
(21, 'HMS/16/21', 'OPD', 'Santosh Kumar Majhi', '', 'Male', '9438753143', 'santoshmajhi99@gmail.com', 'sahid nagar', 'Bhubaneswar', 'Odisha', '75100777', '1992-09-07', '24 years, 3 months, and 10 days', 'Unmarried', 'Hinduism', '', '', '', '', '', '', '', '', '', NULL, NULL, '', '', '2016-12-17', 0),
(22, 'HMS/16/22', 'Casual', 'Rajashree Biswal', '', 'Female', '9078640778', '', 'Saheed nagar', 'Bhubaneswar', 'Odisha', '751007', '2003-05-07', '13 years, 7 months, and 11 days', 'Unmarried', 'Hinduism', '', '', '', '', '', '', '', '', '', 0, 0, '', '', '2016-12-18', 0);

-- --------------------------------------------------------

--
-- Table structure for table `user_table`
--

CREATE TABLE `user_table` (
  `id` int(11) NOT NULL,
  `first_name` text NOT NULL,
  `last_name` text NOT NULL,
  `user_name` text NOT NULL,
  `password` text NOT NULL,
  `roll_type` text NOT NULL,
  `token` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_table`
--

INSERT INTO `user_table` (`id`, `first_name`, `last_name`, `user_name`, `password`, `roll_type`, `token`) VALUES
(1, 'Santosh ', 'Majhi', 'admin', 'e10adc3949ba59abbe56e057f20f883e', 'user', 'ZI93INuF5mIiWlpECfFWZ16Vn7MNDyjg5KNyBHOowRs0Fdk6pdvTzQC6vzIW');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `department_table`
--
ALTER TABLE `department_table`
  ADD PRIMARY KEY (`dep_id`);

--
-- Indexes for table `doctor_table`
--
ALTER TABLE `doctor_table`
  ADD PRIMARY KEY (`doct_id`);

--
-- Indexes for table `patient_previous_history`
--
ALTER TABLE `patient_previous_history`
  ADD PRIMARY KEY (`his_id`);

--
-- Indexes for table `registration_table`
--
ALTER TABLE `registration_table`
  ADD PRIMARY KEY (`reg_id`);

--
-- Indexes for table `user_table`
--
ALTER TABLE `user_table`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `department_table`
--
ALTER TABLE `department_table`
  MODIFY `dep_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `doctor_table`
--
ALTER TABLE `doctor_table`
  MODIFY `doct_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `patient_previous_history`
--
ALTER TABLE `patient_previous_history`
  MODIFY `his_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `registration_table`
--
ALTER TABLE `registration_table`
  MODIFY `reg_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;
--
-- AUTO_INCREMENT for table `user_table`
--
ALTER TABLE `user_table`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
