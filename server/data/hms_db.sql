-- phpMyAdmin SQL Dump
-- version 4.5.0.2
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Dec 15, 2016 at 11:33 AM
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
  `first_name` text NOT NULL,
  `last_name` text NOT NULL,
  `gender` text NOT NULL,
  `mobile` int(12) NOT NULL,
  `email` text NOT NULL,
  `street` text NOT NULL,
  `city` text NOT NULL,
  `state` text NOT NULL,
  `zip` int(11) NOT NULL,
  `dob` date NOT NULL,
  `age` int(11) NOT NULL,
  `marital_status` text NOT NULL,
  `religion` text NOT NULL,
  `prof_type` text,
  `school` text,
  `employer` text,
  `business_type` text,
  `other` text,
  `guardian_type` text,
  `guardian_name` text,
  `guardian_mobile` int(12) DEFAULT NULL,
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

INSERT INTO `registration_table` (`reg_id`, `reg_no`, `registration_type`, `first_name`, `last_name`, `gender`, `mobile`, `email`, `street`, `city`, `state`, `zip`, `dob`, `age`, `marital_status`, `religion`, `prof_type`, `school`, `employer`, `business_type`, `other`, `guardian_type`, `guardian_name`, `guardian_mobile`, `address`, `dep_id`, `doct_id`, `hear_about_us`, `reason`, `reg_date`, `is_deleted`) VALUES
(2, 'HMS/16/2', 'OPD', 'Santosh', 'Majhi', 'male', 2147483647, '', '', '', '', 0, '0000-00-00', 0, '', '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '0000-00-00', 0),
(3, 'HMS/16/3', 'OPD', 'Santosh', 'Majhi', 'male', 2147483647, '', 'Test', 'Test', 'Test', 0, '1982-10-10', 30, 'Single', 'hindu', '', '', '', '', '', '', '', 0, '', 0, 0, '', '', '2016-12-12', 0),
(4, 'HMS/16/4', 'OPD', 'Santosh', 'Majhi', 'male', 2147483647, '', 'Test', 'Test', 'Test', 123456, '1982-10-10', 30, 'Single', 'hindu', '', '', '', '', '', '', '', 0, '', 0, 0, '', '', '2016-12-12', 0),
(5, 'HMS/16/5', 'OPD', 'Santosh', 'Majhi', 'male', 2147483647, 'santoshmajhi99@gmail.com', 'Test', 'Test', 'Test', 123456, '1982-10-10', 30, 'Single', 'hindu', '', '', '', '', '', '', '', 0, '', 0, 0, '', '', '2016-12-12', 0),
(6, 'HMS/16/6', 'OPD', 'Santosh', 'Majhi', 'male', 2147483647, 'santoshmajhi99@gmail.com', 'Test', 'Test', 'Test', 123456, '1982-10-10', 30, 'Single', 'hindu', '', '', '', '', '', '', '', 0, '', 0, 0, '', '', '2016-12-12', 0);

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
(1, 'Santosh ', 'Majhi', 'admin', 'e10adc3949ba59abbe56e057f20f883e', 'user', 'aw8M5YvsRchuqLaeiLmxoOCJdZ7EJTCFoBjCaJVPynGau7iXs2Z3qLtNQmY1');

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
  MODIFY `reg_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `user_table`
--
ALTER TABLE `user_table`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
