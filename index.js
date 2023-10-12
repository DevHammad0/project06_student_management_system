import inquirer from "inquirer";
import chalk from 'chalk';
import showBanner from "node-banner";
class Student {
    name;
    studentId;
    static id = 10000;
    courses = [];
    balance = 0;
    constructor(name) {
        this.name = name;
        this.studentId = ++Student.id;
    }
    //enroll students
    enrollStudentInCourse(course) {
        this.courses.push(course);
    }
    //add balance
    depositBalance(amount) {
        this.balance = amount;
        console.log(`Your new balance: ${this.balance} and you deposited: ${amount}`);
    }
    //view balance
    viewBalance() {
        console.log(chalk.green(`Balance for ${this.name}: ${chalk.yellow(this.balance)}`));
    }
    //pay tuition fee
    payTuitionFee(amount) {
        if (this.balance - amount > 0) {
            this.balance = this.balance - amount;
            console.log(chalk.green(`Tuition fee paid. New balance: ${chalk.yellow(this.balance)}`));
        }
        else {
            console.log(chalk.red("Insufficient Blance!"));
        }
    }
    //show status
    //name,id,courses enrolled & balance
    showStatus() {
        console.log(`
        Student's Name: ${chalk.green(this.name)}
        Student ID: ${chalk.yellow(this.studentId)}
        Courses Enrolled: ${chalk.green(this.courses.join(","))}
        Balance: ${chalk.yellow(this.balance)} 
        `);
    }
}
const students = [];
async function main() {
    while (true) {
        const { choice } = await inquirer.prompt([
            {
                name: "choice",
                type: "list",
                choices: [
                    "Add new student",
                    "Enroll a student in a course",
                    "Deposit amount to account",
                    "View a student's balance",
                    "Pay tuition fees",
                    "Show student status",
                    "Exit"
                ]
            }
        ]);
        switch (choice) {
            case "Add new student":
                const { stuname } = await inquirer.prompt([
                    {
                        name: "stuname",
                        type: "input",
                        message: chalk.blue("Enter student name: ")
                    }
                ]);
                const obj = new Student(stuname);
                students.push(obj);
                console.log(chalk.green(`Student added. Student ID: ${chalk.yellow(obj.studentId)}`));
                console.log(students);
                break;
            case "Enroll a student in a course":
                const { stuId, stuCourse } = await inquirer.prompt([
                    {
                        name: "stuId",
                        type: "number",
                        message: chalk.blue("Enter the student Id:")
                    },
                    {
                        name: "stuCourse",
                        type: "input",
                        message: chalk.blue("Enter the course to enroll:")
                    }
                ]);
                const studentEnrolled = students.find((stu) => (stu.studentId == stuId));
                if (studentEnrolled) {
                    studentEnrolled.enrollStudentInCourse(stuCourse);
                    console.log(chalk.green(`${stuCourse} enrolled for ${studentEnrolled.name}`));
                }
                else {
                    console.log(chalk.red(`Student with ID ${stuId} not found`));
                }
                console.log(studentEnrolled);
                break;
            case "Deposit amount to account":
                const { studId, amount } = await inquirer.prompt([
                    {
                        name: "studId",
                        type: "number",
                        message: chalk.blue("Enter the student ID:")
                    },
                    {
                        name: "amount",
                        type: "number",
                        message: chalk.blue("Enter the amount to deposit:")
                    }
                ]);
                const studentDeposit = students.find((stu) => stu.studentId == studId);
                if (studentDeposit) {
                    studentDeposit.depositBalance(amount);
                }
                else {
                    console.log(chalk.red(`Student with ID ${studId} not found`));
                }
                break;
            case "View a student's balance":
                const { studeId } = await inquirer.prompt([
                    {
                        name: "studeId",
                        type: "number",
                        message: chalk.blue("Enter the student ID:")
                    }
                ]);
                const studentBalance = students.find((stu) => stu.studentId == studeId);
                if (studentBalance) {
                    studentBalance.viewBalance();
                }
                else {
                    console.log(chalk.red(`Student with ID ${studId} not found`));
                }
                break;
            case "Pay tuition fees":
                const { studenId, amountFee } = await inquirer.prompt([
                    {
                        name: "studenId",
                        type: "number",
                        message: chalk.blue("Enter the student ID:")
                    },
                    {
                        name: "amountFee",
                        type: "number",
                        message: chalk.blue("Enter the amount to deposit:")
                    }
                ]);
                const studentTuitionFee = students.find((stu) => stu.studentId == studenId);
                if (studentTuitionFee) {
                    studentTuitionFee.payTuitionFee(amountFee);
                }
                else {
                    console.log(chalk.red(`Student with ID ${studenId} not found`));
                }
                break;
            case "Show student status":
                const { studentId } = await inquirer.prompt([
                    {
                        name: "studentId",
                        type: "number",
                        message: chalk.blue("Enter the student ID:")
                    }
                ]);
                const studentShowStatus = students.find((stu) => stu.studentId == studentId);
                if (studentShowStatus) {
                    studentShowStatus.showStatus();
                }
                else {
                    console.log(chalk.red(`Student with ID ${studentId} not found`));
                }
                break;
            case "Exit":
                console.log(chalk.magenta("GoodBye✌"));
                process.exit(0);
        }
    }
}
(async () => {
    await showBanner('Student\nManagement\nSystem', "\nThe smart way to manage students.\n", "blue", "yellow");
})();
setTimeout(() => {
    main();
}, 300);
